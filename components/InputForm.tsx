import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Textarea } from './ui/Textarea';
import { Icons } from './ui/Icons';
import { FetchingProgress } from './ui/FetchingProgress';
// FIX: Removed unused and invalid Tooltip import.
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip';

interface InputFormProps {
  onGenerate: (market: string, currency: string) => void;
  disabled: boolean;
  onUrlFetch: (url: string) => void;
  isFetchingUrl: boolean;
  propertyDescription: string;
  setPropertyDescription: (value: string) => void;
  propertyImageUrls: string[];
  fetchingProgress: number;
  fetchingStatusText: string;
}

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative aspect-video w-full group">
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full rounded-md bg-cover bg-center transition-all duration-500"
      ></div>
      {images.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Icons.chevronLeft className="h-4 w-4" />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Icons.chevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded-md">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

const InputForm: React.FC<InputFormProps> = ({ 
  onGenerate, disabled, onUrlFetch, isFetchingUrl, 
  propertyDescription, setPropertyDescription, propertyImageUrls,
  fetchingProgress, fetchingStatusText
}) => {
  const [url, setUrl] = useState<string>('');
  const [market, setMarket] = useState<string>('Nigeria');
  const [currency, setCurrency] = useState<string>('NGN (₦)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (propertyDescription.trim() && !disabled) {
      onGenerate(market, currency);
    }
  };
  
  const handleFetchClick = () => {
    if (url.trim() && !isFetchingUrl) onUrlFetch(url);
  }

  const sampleDescription = `For Sale: A stunning 4-bedroom terrace duplex in the heart of Lekki Phase 1, Lagos. This property features all rooms en-suite, a fully fitted kitchen with modern appliances, a spacious living area, and a dedicated parking space for 2 cars. Asking price is 150 million Naira.`;

  return (
    <div className="animate-fade-in">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-ink">
          Create Your Ad Kit in Seconds
        </h1>
        <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
          Start with a property URL to automatically fetch details, or paste the description manually.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-brand-ink">Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="market">Target Market</Label>
                <Input id="market" value={market} onChange={(e) => setMarket(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <Label htmlFor="url" className="text-base font-semibold text-brand-ink">
              Step 1: Fetch from URL <span className="text-sm font-normal text-brand-muted">(Recommended)</span>
            </Label>
            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <Input 
                id="url" type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-property-site.com/listing/123"
                disabled={isFetchingUrl}
              />
              <Button type="button" onClick={handleFetchClick} disabled={!url.trim() || isFetchingUrl || disabled} className="sm:w-auto">
                {isFetchingUrl && <Icons.spinner className="animate-spin mr-2 h-4 w-4" />}
                {isFetchingUrl ? "Fetching..." : "Fetch Details"}
              </Button>
            </div>
            {isFetchingUrl && (
              <div className="mt-4">
                <FetchingProgress progress={fetchingProgress} statusText={fetchingStatusText} />
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-3">
               <Label htmlFor="description" className="text-base font-semibold text-brand-ink">Step 2: Provide Description Manually</Label>
               <button type="button" onClick={() => setPropertyDescription(sampleDescription)} className="text-sm text-brand-primary/80 hover:text-brand-primary transition">
                  Use Sample
               </button>
            </div>
            <Textarea
              id="description" rows={10} value={propertyDescription} onChange={(e) => setPropertyDescription(e.target.value)}
              placeholder="If the URL fetch doesn't work, or for more control, paste the property details here."
            />
          </Card>
        </div>

        <aside className="lg:col-span-1 sticky top-24 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-brand-ink mb-3">Fetched Content Preview</h3>
            {propertyDescription || propertyImageUrls.length > 0 ? (
              <div className="space-y-4">
                <ImageCarousel images={propertyImageUrls} />
                {propertyDescription && (
                  <p className="text-sm text-brand-muted line-clamp-6">{propertyDescription}</p>
                )}
              </div>
            ) : (
              <div className="h-40 bg-brand-bg/50 rounded-md flex items-center justify-center border border-dashed border-brand-surface">
                <p className="text-sm text-brand-muted text-center">Your fetched content will appear here.</p>
              </div>
            )}
          </Card>
          <Button type="submit" size="lg" className="w-full" disabled={!propertyDescription.trim() || disabled || isFetchingUrl}>
            <Icons.lightbulb className="mr-2 h-5 w-5" />
            Generate Ad Kit
          </Button>
        </aside>
      </form>
    </div>
  );
};

export default InputForm;