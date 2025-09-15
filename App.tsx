import React, { useState, useEffect, useCallback } from 'react';
import { AdKitData } from './types';
import { generateAdKit } from './services/geminiService';
import InputForm from './components/InputForm';
import AdKitDisplay from './components/AdKitDisplay';
import { ApiKeyBanner } from './components/ApiKeyBanner';
import { Alert, AlertDescription } from './components/ui/Alert';
import { TopBar } from './components/TopBar';
import { EmptyState } from './components/ui/EmptyState';
import { Icons } from './components/ui/Icons';
import { ExportSection } from './components/sections/ExportSection';
import { Card } from './components/ui/Card';
import { MobileNav } from './components/ui/MobileNav';
import { AdKitDisplaySkeleton } from './components/AdKitDisplaySkeleton';
import { Drawer } from './components/ui/Drawer';

// Proxy fetching logic for overcoming CORS issues.
interface ProxyConfig {
  url: string;
  options?: Omit<RequestInit, 'signal'>;
}
type ProxyProvider = (url:string) => ProxyConfig;
const PROXY_PROVIDERS: ProxyProvider[] = [
    (url: string) => ({ url: `https://corsproxy.io/?${encodeURIComponent(url)}` }),
    (url: string) => ({ url: `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}` }),
];

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface NavItem {
  id: string;
  title: string;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'images', title: 'Property Images' },
    { id: 'data', title: 'Extracted Data' },
    { id: 'insights', title: 'Market Insights' },
    { id: 'personas', title: 'Ad Copy' },
    { id: 'video', title: 'Video Plan' },
    { id: 'metrics', title: 'Investor Metrics' },
    { id: 'staging', title: 'Staging & Prompts' },
    { id: 'platforms', title: 'Social Packs' },
    { id: 'seo', title: 'SEO' },
];

const App: React.FC = () => {
  const [adKitData, setAdKitData] = useState<AdKitData | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isApiKeyMissing, setIsApiKeyMissing] = useState<boolean>(false);
  
  const [propertyDescription, setPropertyDescription] = useState<string>('');
  const [propertyImageUrls, setPropertyImageUrls] = useState<string[]>([]);
  const [isFetchingUrl, setIsFetchingUrl] = useState<boolean>(false);
  const [market, setMarket] = useState<string>('Nigeria');
  const [currency, setCurrency] = useState<string>('NGN (₦)');

  // State for sidebar interactions
  const [favoritedPersonas, setFavoritedPersonas] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('images');
  const [isInputDrawerOpen, setIsInputDrawerOpen] = useState(false);
  
  useEffect(() => {
    if (!process.env.API_KEY) setIsApiKeyMissing(true);
    try {
      const saved = localStorage.getItem('favoritedPersonas');
      if (saved) setFavoritedPersonas(JSON.parse(saved));
    } catch (e) { console.error("Failed to parse favorites"); }
  }, []);

  const handleUrlFetch = async (url: string) => {
    if (!url.startsWith('http')) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    setIsFetchingUrl(true);
    setError(null);
    setPropertyDescription('');
    setPropertyImageUrls([]);

    for (const [index, provider] of PROXY_PROVIDERS.entries()) {
      try {
        const { url: proxyUrl, options = {} } = provider(url);
        const response = await fetch(proxyUrl, options);
        if (!response.ok) throw new Error(`Request failed with status: ${response.status}`);
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const imageUrls = Array.from(doc.querySelectorAll('img')).map(img => new URL(img.getAttribute('data-src') || img.src, url).href).slice(0, 10);
        
        doc.querySelectorAll('script, style, link, nav, header, footer, aside').forEach(el => el.remove());
        const bodyText = (doc.body.textContent || '').replace(/\s{3,}/g, '\n\n').trim();
        
        if (!bodyText) throw new Error("Extracted content was empty.");
        
        setPropertyDescription(bodyText);
        setPropertyImageUrls(imageUrls);
        setIsFetchingUrl(false);
        return;
      } catch (e) {
        console.warn(`Fetch attempt ${index + 1} failed:`, e);
      }
    }

    setIsFetchingUrl(false);
    setError("All URL fetch attempts failed. Please paste the content manually.");
  };

  const handleGenerate = async () => {
    if (isApiKeyMissing || !propertyDescription.trim() || isGenerating) return;
    
    setIsInputDrawerOpen(false); // Close mobile drawer if open
    setIsGenerating(true);
    setAdKitData(null);
    setError(null);

    try {
      const data = await generateAdKit(propertyDescription, market, currency);
      setAdKitData(data);
      document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e: any) {
      setError(`Failed to generate ad kit: ${e.message || 'Please try again.'}`);
      setAdKitData(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOver = useCallback(() => {
    setAdKitData(null);
    setError(null);
    setPropertyDescription('');
    setPropertyImageUrls([]);
    setIsFetchingUrl(false);
  }, []);
  
  const handleToggleFavorite = (persona: string) => {
    setFavoritedPersonas(prev => {
      const newFavorites = prev.includes(persona) ? prev.filter(p => p !== persona) : [...prev, persona];
      localStorage.setItem('favoritedPersonas', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const renderContent = () => {
    if (isGenerating) {
      return <AdKitDisplaySkeleton />;
    }
    if (error && !adKitData) {
      return (
        <div className="af-p-4">
          <Alert variant="destructive" className="af-mb-6"><AlertDescription>{error}</AlertDescription></Alert>
          <EmptyState
            icon={<Icons.lightbulb className="af-h-8 af-w-8" />}
            title="Generation Failed"
            description="There was an error generating your ad kit. Please adjust your inputs or try again."
          />
        </div>
      );
    }
    if (adKitData) {
      return (
        <AdKitDisplay
          data={adKitData}
          imageUrls={propertyImageUrls}
          isApiKeyMissing={isApiKeyMissing}
          favoritedPersonas={favoritedPersonas}
          onToggleFavorite={handleToggleFavorite}
          setActiveSection={setActiveSection}
        />
      );
    }
    return (
       <div className="af-p-4">
        <EmptyState
          icon={<Icons.lightbulb className="af-h-8 af-w-8" />}
          title="Your Ad Kit Awaits"
          description="Use the panel on the left (or the 'Create' button on mobile) to provide property details."
        />
       </div>
    );
  };

  const StickyNav: React.FC = () => (
    <Card className="af-p-4">
      <h3 className="af-font-semibold af-text-text-hi af-mb-3">Sections</h3>
      <ul className="af-space-y-1">
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={cn(
              'af-block af-transition-all af-duration-200 af-rounded-md af-px-3 af-py-2 af-text-sm af-relative',
              activeSection === item.id
                ? 'af-text-accent af-bg-accent/10'
                : 'af-text-text-lo hover:af-text-text-hi hover:af-bg-surface/50'
            )}>
              {activeSection === item.id && <span className="af-absolute af-left-0 af-top-1/2 -af-translate-y-1/2 af-h-5 af-w-1 af-bg-accent af-rounded-r-full" />}
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );

  const FavoritesSection: React.FC = () => {
      if (!adKitData?.personaVariants) return null;
      const favoritedVariants = adKitData.personaVariants.filter(v => favoritedPersonas.includes(v.persona));
      if (favoritedVariants.length === 0) return null;

      return (
        <Card className="af-p-4">
          <h3 className="af-font-semibold af-text-text-hi af-mb-3 af-flex af-items-center af-gap-2">
            <Icons.starSolid className="af-text-yellow-400 af-h-5 af-w-5" />
            Favorited Ad Copy
          </h3>
          <div className="af-space-y-3">
            {favoritedVariants.map((variant) => (
              <div key={variant.persona} className="af-bg-surface af-p-3 af-rounded-md af-relative af-text-sm af-border af-border-line">
                <p className="af-font-bold af-text-accent/80">{variant.persona}</p>
                <p className="af-text-text-lo af-mt-1 af-whitespace-pre-wrap">{variant.headline}</p>
              </div>
            ))}
          </div>
        </Card>
      );
  };

  const inputFormProps = {
    onGenerate: handleGenerate,
    disabled: isApiKeyMissing || isGenerating,
    onUrlFetch: handleUrlFetch,
    isFetchingUrl,
    propertyDescription,
    setPropertyDescription,
    market,
    setMarket,
    currency,
    setCurrency,
  };

  return (
    <div className="af-flex af-flex-col af-h-screen">
      <header className="af-flex-shrink-0 af-bg-ink/50 af-backdrop-blur-xl af-border-b af-border-line/50 af-sticky af-top-0 af-z-40">
        <TopBar 
          onGenerate={handleGenerate}
          canGenerate={!!propertyDescription.trim() && !isApiKeyMissing && !isGenerating}
          onBack={handleStartOver}
          showBack={!!adKitData || !!error}
          onOpenInput={() => setIsInputDrawerOpen(true)}
        />
      </header>
      {isApiKeyMissing && <ApiKeyBanner />}
      <div className="af-flex-grow af-grid af-grid-cols-1 lg:af-grid-cols-12 af-gap-x-8 af-overflow-hidden">
        
        {/* Left Panel: Inputs (Desktop) */}
        <aside className="af-hidden lg:af-block lg:af-col-span-4 xl:af-col-span-3 af-overflow-y-auto af-p-6">
          <InputForm {...inputFormProps} />
        </aside>

        {/* Center Panel: Content */}
        <main id="main-content" className="lg:af-col-span-8 xl:af-col-span-6 af-overflow-y-auto af-py-6">
          <div className="af-container !af-py-0">
             {renderContent()}
          </div>
        </main>

        {/* Right Panel: Sidebar */}
        <aside className="af-hidden xl:af-block xl:af-col-span-3 af-overflow-y-auto af-p-6">
            {adKitData && (
              <div className="af-space-y-6 lg:af-sticky af-top-24">
                  <ExportSection data={adKitData} />
                  <StickyNav />
                  <FavoritesSection />
              </div>
            )}
        </aside>
      </div>

      {/* Mobile Input Drawer */}
      <Drawer isOpen={isInputDrawerOpen} onClose={() => setIsInputDrawerOpen(false)} title="Create Ad Kit">
          <div className="af-p-4">
            <InputForm {...inputFormProps} />
          </div>
      </Drawer>

      {adKitData && <MobileNav navItems={NAV_ITEMS} activeSection={activeSection} />}
    </div>
  );
};

export default App;