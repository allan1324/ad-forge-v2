import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Textarea } from './ui/Textarea';
import { Icons } from './ui/Icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';

interface InputFormProps {
  onGenerate: () => void;
  disabled: boolean;
  onUrlFetch: (url: string) => void;
  isFetchingUrl: boolean;
  propertyDescription: string;
  setPropertyDescription: (value: string) => void;
  market: string;
  setMarket: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ 
  onGenerate,
  disabled, onUrlFetch, isFetchingUrl, 
  propertyDescription, setPropertyDescription,
  market, setMarket, currency, setCurrency
}) => {
  const [url, setUrl] = useState<string>('');

  const handleFetchClick = () => {
    if (url.trim() && !isFetchingUrl) onUrlFetch(url);
  }

  const sampleDescription = `For Sale: A stunning 4-bedroom terrace duplex in the heart of Lekki Phase 1, Lagos. This property features all rooms en-suite, a fully fitted kitchen with modern appliances, a spacious living area, and a dedicated parking space for 2 cars. Asking price is 150 million Naira.`;

  return (
    <div className="af-space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="af-space-y-4">
          <div>
            <Label htmlFor="market">Target Market</Label>
            <Input id="market" value={market} onChange={(e) => setMarket(e.target.value)} disabled={disabled} />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} disabled={disabled} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="url">
            <TabsList className="af-grid af-w-full af-grid-cols-2">
              <TabsTrigger value="url">Fetch from URL</TabsTrigger>
              <TabsTrigger value="manual">Paste Manually</TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="af-space-y-3">
              <Label htmlFor="url" className="af-sr-only">Property URL</Label>
              <div className="af-flex af-gap-3">
                <Input 
                  id="url" type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-property-site.com/listing/123"
                  disabled={isFetchingUrl || disabled}
                />
                <Button type="button" onClick={handleFetchClick} disabled={!url.trim() || isFetchingUrl || disabled} className="af-flex-shrink-0">
                  {isFetchingUrl && <Icons.spinner className="af-animate-spin af-mr-2 af-h-4 af-w-4" />}
                  Fetch
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="manual" className="af-space-y-3">
              <div className="af-flex af-justify-end af-items-center">
                 <button type="button" onClick={() => setPropertyDescription(sampleDescription)} className="af-text-sm af-text-accent/80 hover:af-text-accent af-transition" disabled={disabled}>
                    Use Sample
                 </button>
              </div>
              <Textarea
                id="description" rows={12} value={propertyDescription} onChange={(e) => setPropertyDescription(e.target.value)}
                placeholder="Paste the property details here."
                disabled={disabled}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="af-pt-2">
        <Button
          onClick={onGenerate}
          disabled={disabled || !propertyDescription.trim()}
          size="lg"
          className="af-w-full"
        >
          <Icons.lightbulb className="af-mr-2 af-h-5 af-w-5" />
          Generate Ad Kit
        </Button>
      </div>
    </div>
  );
};

export default InputForm;