import React, { useState, useEffect, useCallback } from 'react';
import { AdKitData, AppStep } from './types';
import { generateAdKit } from './services/geminiService';
import InputForm from './components/InputForm';
import AdKitDisplay from './components/AdKitDisplay';
import Loader from './components/Loader';
import { Header } from './components/Header';
import { ApiKeyBanner } from './components/ApiKeyBanner';

// --- NEW: Advanced Proxy Configuration ---
interface ProxyConfig {
  url: string;
  options?: Omit<RequestInit, 'signal'>; // Omit signal as it's handled in the loop
}
type ProxyProvider = (url: string) => ProxyConfig;

// --- UPDATED: Refreshed and reordered proxy list for better reliability ---
const PROXY_PROVIDERS: ProxyProvider[] = [
    // 1. corsproxy.io: A modern and reliable proxy.
    (url: string) => ({
        url: `https://corsproxy.io/?${encodeURIComponent(url)}`
    }),
    // 2. AllOrigins: Reliable, wraps response in JSON, so we use the /raw endpoint.
    (url: string) => ({
        url: `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
    }),
    // 3. CORS.SH: Removing the expired temp API key. It may still work on a free tier.
    (url: string) => ({
        url: `https://proxy.cors.sh/${url}`,
        options: {
            headers: {
                // The temp key 'temp_b7313364f3d1b28cb46a9a7a937c865e' is expired.
                // Removing it to avoid authentication errors.
            },
        },
    }),
    // 4. CORS.monster: A straightforward proxy as a fallback.
    (url: string) => ({
        url: `https://cors.monster/${url}`
    }),
    // 5. fringe.zone: Another alternative.
    (url: string) => ({
        url: `https://cors-proxy.fringe.zone/${url}`
    }),
    // 6. ThingProxy: Can be slow/unreliable, so it's last.
    (url: string) => ({
        url: `https://thingproxy.freeboard.io/fetch/${url}`
    }),
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


  useEffect(() => {
    if (!process.env.API_KEY) {
      setIsApiKeyMissing(true);
    }
  }, []);

  const handleUrlFetch = async (url: string) => {
    if (!url.startsWith('http')) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    setIsFetchingUrl(true);
    setError(null);
    setPropertyDescription('');
    setPropertyImageUrls([]); // Clear previous images

    let lastError: Error | null = null;

    for (const provider of PROXY_PROVIDERS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second timeout per proxy

      try {
        const { url: proxyUrl, options = {} } = provider(url);
        
        const fetchOptions: RequestInit = {
          ...options,
          signal: controller.signal,
          headers: {
            ...(options.headers || {}),
          },
        };

        const response = await fetch(proxyUrl, fetchOptions);

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Proxy request failed with status: ${response.status} via ${new URL(proxyUrl).hostname}.`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // --- NEW: Advanced Image Extraction Logic ---
        const imageUrls = new Set<string>();

        // 1. Extract from <img> tags, checking for lazy-loading attributes
        const imageElements = Array.from(doc.querySelectorAll('img'));
        for (const img of imageElements) {
            const lazySrc = img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
            const regularSrc = img.getAttribute('src');
            const srcset = img.getAttribute('srcset');

            let rawSrc: string | null = null;

            if (lazySrc) {
                rawSrc = lazySrc;
            } else if (srcset) {
                // Simple srcset parse: take the first URL
                rawSrc = srcset.split(',')[0].trim().split(' ')[0];
            } else if (regularSrc) {
                rawSrc = regularSrc;
            }

            if (!rawSrc || rawSrc.startsWith('data:') || rawSrc.toLowerCase().endsWith('.svg') || rawSrc.toLowerCase().endsWith('.gif')) {
                continue;
            }

            // Filter out tiny images based on attributes
            const width = parseInt(img.getAttribute('width') || '0', 10);
            const height = parseInt(img.getAttribute('height') || '0', 10);
            if ((width > 0 && width < 100) || (height > 0 && height < 100)) {
                continue;
            }

            try {
                const fullUrl = new URL(rawSrc, url).href;
                imageUrls.add(fullUrl);
            } catch (e) {
                // Ignore invalid URLs
            }
        }

        // 2. Extract from background-image styles
        const styledElements = Array.from(doc.querySelectorAll('[style*="background-image"]'));
        for (const el of styledElements) {
            const style = el.getAttribute('style');
            const match = style?.match(/url\((['"]?)(.*?)\1\)/);
            const rawSrc = match ? match[2] : null;

            if (!rawSrc || rawSrc.startsWith('data:') || rawSrc.toLowerCase().endsWith('.svg') || rawSrc.toLowerCase().endsWith('.gif')) {
                continue;
            }
            
            try {
                const fullUrl = new URL(rawSrc, url).href;
                imageUrls.add(fullUrl);
            } catch(e) {
                // Ignore invalid URLs
            }
        }

        // 3. Filter, clean, and limit
        const finalImageUrls = Array.from(imageUrls)
            .filter(imgUrl => {
                const lowerUrl = imgUrl.toLowerCase();
                return !lowerUrl.includes('logo') && !lowerUrl.includes('icon') && !lowerUrl.includes('avatar') && !lowerUrl.includes('spinner') && !lowerUrl.includes('placeholder');
            })
            .slice(0, 10); // Get up to 10 unique images

        setPropertyImageUrls(finalImageUrls);


        // --- Text Extraction Logic ---
        doc.querySelectorAll('script, style, link, nav, header, footer, aside, form, button, input').forEach(el => el.remove());
        const bodyText = doc.body.textContent || '';
        
        const cleanText = bodyText
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 20)
          .join('\n')
          .replace(/\s{3,}/g, '\n\n');

        if (!cleanText.trim()) {
          throw new Error("Could not extract meaningful content from the URL via this proxy.");
        }
        
        setPropertyDescription(cleanText.trim());
        setError(null);
        setIsFetchingUrl(false);
        return;

      } catch (e: any) {
        clearTimeout(timeoutId);
        console.warn(`Proxy attempt failed:`, e.message);
        lastError = e;
      }
    }

    // If the loop completes, all proxies have failed.
    console.error("All proxy attempts failed.", lastError);
    if (lastError?.name === 'AbortError') {
       setError("Fetch timed out: The target website may be slow or offline. Please try again or paste the content manually.");
    } else {
       setError(`Failed to fetch from URL. This can happen if the website blocks automated tools, uses strong CORS protection, or if our public proxy services are temporarily down. Please try a different URL or paste the content manually.`);
    }
    setPropertyDescription('');
    setPropertyImageUrls([]);
    setIsFetchingUrl(false);
  };

  const handleGenerate = async (market: string, currency: string) => {
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
    const messages = [
        "Analyzing property details...",
        "Scouting the neighborhood for highlights...",
        "Running the numbers for investment insights...",
        "Crafting compelling ad copy...",
        "Storyboarding a promotional video...",
        "Personalizing content for buyer personas...",
        "Finalizing the ad kit..."
    ];

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
      console.error(e);
      setError(`Failed to generate ad kit. ${e.message || 'Please try again.'}`);
      setStep(AppStep.Input);
    } finally {
      clearInterval(intervalId);
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleBack = useCallback(() => {
    setAdKitData(null);
    setError(null);
    setStep(AppStep.Input);
    setPropertyDescription('');
    setPropertyImageUrls([]);
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {isApiKeyMissing && <ApiKeyBanner />}
        {isLoading && <Loader message={loadingMessage} />}
        {!isLoading && error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {!isLoading && step === AppStep.Input && (
            <InputForm 
                onGenerate={handleGenerate} 
                disabled={isApiKeyMissing}
                onUrlFetch={handleUrlFetch}
                isFetchingUrl={isFetchingUrl}
                propertyDescription={propertyDescription}
                setPropertyDescription={setPropertyDescription}
                propertyImageUrls={propertyImageUrls}
            />
        )}
        {!isLoading && step === AppStep.AdKit && adKitData && (
            <AdKitDisplay 
                data={adKitData} 
                onBack={handleBack} 
                imageUrls={propertyImageUrls} 
            />
        )}
      </main>
    </div>
  );
};

export default App;