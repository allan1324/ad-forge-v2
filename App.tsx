import React, { useState, useEffect, useCallback } from 'react';
import { AdKitData, AppStep } from './types';
import { generateAdKit } from './services/geminiService';
import InputForm from './components/InputForm';
import AdKitDisplay from './components/AdKitDisplay';
import Loader from './components/Loader';
import { Header } from './components/Header';
import { ApiKeyBanner } from './components/ApiKeyBanner';
import { Alert, AlertDescription, AlertTitle } from './components/ui/Alert';

// Proxy configuration remains the same
interface ProxyConfig {
  url: string;
  options?: Omit<RequestInit, 'signal'>;
}
type ProxyProvider = (url:string) => ProxyConfig;
const PROXY_PROVIDERS: ProxyProvider[] = [
    (url: string) => ({ url: `https://corsproxy.io/?${encodeURIComponent(url)}` }),
    (url: string) => ({ url: `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}` }),
    (url: string) => ({ url: `https://proxy.cors.sh/${url}` }),
    (url: string) => ({ url: `https://cors.monster/${url}` }),
    (url: string) => ({ url: `https://cors-proxy.fringe.zone/${url}` }),
    (url: string) => ({ url: `https://thingproxy.freeboard.io/fetch/${url}` }),
];

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Input);
  const [adKitData, setAdKitData] = useState<AdKitData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isApiKeyMissing, setIsApiKeyMissing] = useState<boolean>(false);
  
  const [propertyDescription, setPropertyDescription] = useState<string>('');
  const [isFetchingUrl, setIsFetchingUrl] = useState<boolean>(false);
  const [propertyImageUrls, setPropertyImageUrls] = useState<string[]>([]);
  const [fetchingProgress, setFetchingProgress] = useState(0);
  const [fetchingStatusText, setFetchingStatusText] = useState('');

  useEffect(() => {
    if (!process.env.API_KEY) {
      setIsApiKeyMissing(true);
    }
  }, []);

  const handleUrlFetch = async (url: string) => {
    // URL Fetching logic remains unchanged
    if (!url.startsWith('http')) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    setIsFetchingUrl(true);
    setError(null);
    setPropertyDescription('');
    setPropertyImageUrls([]);
    setFetchingProgress(0);

    let lastError: Error | null = null;
    const specificErrorMessages: string[] = [];

    for (let i = 0; i < PROXY_PROVIDERS.length; i++) {
      const provider = PROXY_PROVIDERS[i];
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const { url: proxyUrl, options = {} } = provider(url);
      const proxyHost = new URL(proxyUrl).hostname;
      
      setFetchingProgress((i + 1) / PROXY_PROVIDERS.length);
      setFetchingStatusText(`Attempt ${i + 1}/${PROXY_PROVIDERS.length}: Trying via ${proxyHost}...`);
      
      try {
        const response = await fetch(proxyUrl, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`Request failed with status: ${response.status} via ${proxyHost}.`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const imageUrls = new Set<string>();
        doc.querySelectorAll('img').forEach(img => {
          const src = img.getAttribute('data-src') || img.getAttribute('src');
          if (src && !src.startsWith('data:') && !src.endsWith('.svg')) {
            try { imageUrls.add(new URL(src, url).href); } catch (e) {}
          }
        });
        
        const finalImageUrls = Array.from(imageUrls).slice(0, 10);
        setPropertyImageUrls(finalImageUrls);

        doc.querySelectorAll('script, style, link, nav, header, footer, aside').forEach(el => el.remove());
        const bodyText = doc.body.textContent || '';
        const cleanText = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 20).join('\n').replace(/\s{3,}/g, '\n\n');
        
        if (!cleanText.trim()) throw new Error("Extracted content was empty using this proxy.");
        
        setPropertyDescription(cleanText.trim());
        setError(null);
        setIsFetchingUrl(false);
        setFetchingProgress(0);
        setFetchingStatusText('');
        return;

      } catch (e: any) {
        clearTimeout(timeoutId);
        lastError = e;
        specificErrorMessages.push(e.message);
      }
    }

    setIsFetchingUrl(false);
    setError("All attempts to fetch the URL failed. Please try a different URL or paste the content manually.");
  };

  const handleGenerate = async (market: string, currency: string) => {
    // Ad Kit generation logic remains unchanged
    if (isApiKeyMissing) {
      setError("API Key is missing. Please set it up in your environment variables.");
      return;
    }
    if (!propertyDescription.trim()) {
      setError("Property description cannot be empty. Fetch from a URL or enter it manually.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAdKitData(null);
    const messages = ["Analyzing property details...","Scouting the neighborhood...","Running investment numbers...","Crafting compelling ad copy...","Finalizing the ad kit..."];
    let messageIndex = 0;
    setLoadingMessage(messages[messageIndex]);
    const intervalId = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setLoadingMessage(messages[messageIndex]);
    }, 2500);

    try {
      const data = await generateAdKit(propertyDescription, market, currency);
      setAdKitData(data);
      setStep(AppStep.AdKit);
    } catch (e: any) {
      setError(`Failed to generate ad kit. ${e.message || 'Please try again.'}`);
      setStep(AppStep.Input);
    } finally {
      clearInterval(intervalId);
      setIsLoading(false);
    }
  };

  const handleBack = useCallback(() => {
    setAdKitData(null);
    setError(null);
    setStep(AppStep.Input);
    setPropertyDescription('');
    setPropertyImageUrls([]);
  }, []);

  const CurrentView = () => {
    if (step === AppStep.AdKit && adKitData) {
      return <AdKitDisplay data={adKitData} onBack={handleBack} imageUrls={propertyImageUrls} />;
    }
    return <InputForm 
              onGenerate={handleGenerate} 
              disabled={isApiKeyMissing}
              onUrlFetch={handleUrlFetch}
              isFetchingUrl={isFetchingUrl}
              propertyDescription={propertyDescription}
              setPropertyDescription={setPropertyDescription}
              propertyImageUrls={propertyImageUrls}
              fetchingProgress={fetchingProgress}
              fetchingStatusText={fetchingStatusText}
            />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {isApiKeyMissing && <ApiKeyBanner />}
        {isLoading && <Loader message={loadingMessage} />}
        
        {!isLoading && error && (
          <Alert variant="destructive" className="mb-6 max-w-4xl mx-auto">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <CurrentView />
        </div>
      </main>
    </div>
  );
};

export default App;