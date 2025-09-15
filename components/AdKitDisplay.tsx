import React, { useState, useEffect, useRef } from 'react';
import type { AdKitData, PersonaVariant } from '../types';
import { DataReview } from './sections/DataReview';
import { InsightsSection } from './sections/InsightsSection';
import { InvestorMetricsSection } from './sections/InvestorMetricsSection';
import { PersonaVariantsSection } from './sections/PersonaVariantsSection';
import { ShortFormVideoSection } from './sections/VideoPlanSection';
import { StagingAndImagePromptsSection } from './sections/StagingAndImagePromptsSection';
import { PlatformPacksSection } from './sections/PlatformPacksSection';
import { SeoSection } from './sections/SeoSection';
import { ExportSection } from './sections/ExportSection';
import { QuestionsSection } from './sections/QuestionsSection';
import { Accordion } from './ui/Accordion';
import { Icons } from './ui/Icons';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CopyButton } from './ui/CopyButton';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface AdKitDisplayProps {
  data: AdKitData;
  onBack: () => void;
  imageUrls?: string[];
}

const PropertyImagesSection: React.FC<{ imageUrls: string[] }> = ({ imageUrls }) => (
  <Accordion title="Fetched Property Images" icon={<Icons.image />} defaultOpen={true} id="images">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {imageUrls.map((url, index) => (
        <a href={url} target="_blank" rel="noopener noreferrer" key={index} className="group aspect-square block bg-brand-surface rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 hover:z-10">
          <img src={url} alt={`Property image ${index + 1}`} className="w-full h-full object-cover"/>
        </a>
      ))}
    </div>
  </Accordion>
);

const FavoritesSection: React.FC<{ variants: PersonaVariant[], favoritedPersonas: string[] }> = ({ variants, favoritedPersonas }) => {
  const favoritedVariants = variants.filter(v => favoritedPersonas.includes(v.persona));
  if (favoritedVariants.length === 0) return null;

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-brand-ink mb-3 flex items-center gap-2">
        <Icons.starSolid className="text-yellow-400 h-5 w-5" />
        Favorited Ad Copy
      </h3>
      <div className="space-y-3">
        {favoritedVariants.map((variant) => (
          <div key={variant.persona} className="bg-brand-bg/50 p-3 rounded-md relative text-sm">
            <CopyButton textToCopy={`Headline: ${variant.headline}\n\n${variant.primaryText}`} />
            <p className="font-bold text-brand-primary/80">{variant.persona}</p>
            <p className="text-brand-muted mt-1 whitespace-pre-wrap">{variant.headline}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const StickyNav: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const navItems = [
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
  return (
    <Card className="p-4">
      <h3 className="font-semibold text-brand-ink mb-3">Sections</h3>
      <ul className="space-y-1">
        {navItems.map(item => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={cn(
              'block transition-all duration-200 rounded-md px-3 py-2 text-sm relative',
              activeSection === item.id
                ? 'text-brand-primary bg-slate-800/50'
                : 'text-brand-muted hover:text-brand-ink hover:bg-slate-800/30'
            )}>
              {activeSection === item.id && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 bg-brand-primary rounded-r-full" />}
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
};


const AdKitDisplay: React.FC<AdKitDisplayProps> = ({ data, onBack, imageUrls = [] }) => {
  const [favoritedPersonas, setFavoritedPersonas] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('images');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('favoritedPersonas');
      if (saved) setFavoritedPersonas(JSON.parse(saved));
    } catch (e) { console.error("Failed to parse favorites"); }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px', threshold: 0 }
    );

    const sectionIds = ['images', 'data', 'insights', 'personas', 'video', 'metrics', 'staging', 'platforms', 'seo'];
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if(element) {
        sectionRefs.current[id] = element;
        observer.observe(element);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [data]);

  const handleToggleFavorite = (persona: string) => {
    setFavoritedPersonas(prev => {
      const newFavorites = prev.includes(persona) ? prev.filter(p => p !== persona) : [...prev, persona];
      localStorage.setItem('favoritedPersonas', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="animate-fade-in">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold font-display text-brand-ink">Your Ad Kit is Ready</h1>
        <Button onClick={onBack} variant="secondary" className="flex-shrink-0">
          &larr; Start Over
        </Button>
      </header>

      {data.questionsToConfirm?.length > 0 && (
          <QuestionsSection questions={data.questionsToConfirm} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mt-8">
        <main className="lg:col-span-3 space-y-6">
          {imageUrls.length > 0 && <PropertyImagesSection imageUrls={imageUrls} />}
          {data.extractedData && <DataReview data={data.extractedData} />}
          {data.insights && <InsightsSection data={data.insights} />}
          {data.personaVariants && <PersonaVariantsSection variants={data.personaVariants} favoritedPersonas={favoritedPersonas} onToggleFavorite={handleToggleFavorite} />}
          {data.Short_Form_Video && data.Voiceover && <ShortFormVideoSection videoData={data.Short_Form_Video} voiceoverData={data.Voiceover} />}
          {data.investorMetrics && <InvestorMetricsSection data={data.investorMetrics} />}
          {(data.stagingPresets || data.imageGenPrompts) && <StagingAndImagePromptsSection presets={data.stagingPresets || []} prompts={data.imageGenPrompts || []} />}
          {data.platformPacks && <PlatformPacksSection packs={data.platformPacks} />}
          {data.seo && <SeoSection data={data.seo} />}
        </main>
        
        <aside className="space-y-6 lg:sticky top-24">
            <ExportSection data={data} />
            <StickyNav activeSection={activeSection} />
            {data.personaVariants && <FavoritesSection variants={data.personaVariants} favoritedPersonas={favoritedPersonas} />}
        </aside>
      </div>
    </div>
  );
};

export default AdKitDisplay;