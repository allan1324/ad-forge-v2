import React, { useEffect, useRef } from 'react';
import type { AdKitData } from '../types';
import { DataReview } from './sections/DataReview';
import { InsightsSection } from './sections/InsightsSection';
import { InvestorMetricsSection } from './sections/InvestorMetricsSection';
import { PersonaVariantsSection } from './sections/PersonaVariantsSection';
import { ShortFormVideoSection } from './sections/VideoPlanSection';
import { StagingAndImagePromptsSection } from './sections/StagingAndImagePromptsSection';
import { PlatformPacksSection } from './sections/PlatformPacksSection';
import { SeoSection } from './sections/SeoSection';
import { QuestionsSection } from './sections/QuestionsSection';
import { Accordion } from './ui/Accordion';
import { Icons } from './ui/Icons';

interface AdKitDisplayProps {
  data: AdKitData;
  imageUrls?: string[];
  isApiKeyMissing: boolean;
  favoritedPersonas: string[];
  onToggleFavorite: (persona: string) => void;
  setActiveSection: (sectionId: string) => void;
}

const PropertyImagesSection: React.FC<{ imageUrls: string[] }> = ({ imageUrls }) => (
  <Accordion title="Fetched Property Images" icon={<Icons.image />} defaultOpen={true} id="images">
    <div className="af-grid af-grid-cols-2 sm:af-grid-cols-3 md:af-grid-cols-4 af-gap-4">
      {imageUrls.map((url, index) => (
        <a href={url} target="_blank" rel="noopener noreferrer" key={index} className="af-group af-aspect-square af-block af-bg-surface af-rounded-lg af-overflow-hidden af-shadow-md af-transition-transform hover:af-scale-105 hover:af-z-10 af-border af-border-line">
          <img src={url} alt={`Property image ${index + 1}`} className="af-w-full af-h-full af-object-cover"/>
        </a>
      ))}
    </div>
  </Accordion>
);

const AdKitDisplay: React.FC<AdKitDisplayProps> = ({ 
  data, 
  imageUrls = [], 
  isApiKeyMissing,
  favoritedPersonas,
  onToggleFavorite,
  setActiveSection
}) => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
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
  }, [data, setActiveSection]);

  return (
    <div className="af-pb-24 lg:af-pb-0 af-space-y-6 stagger-children">
      {data.questionsToConfirm?.length > 0 && (
          <QuestionsSection questions={data.questionsToConfirm} />
      )}

      {imageUrls.length > 0 && <PropertyImagesSection imageUrls={imageUrls} />}
      {data.extractedData && <DataReview data={data.extractedData} />}
      {data.insights && <InsightsSection data={data.insights} />}
      {data.personaVariants && <PersonaVariantsSection variants={data.personaVariants} favoritedPersonas={favoritedPersonas} onToggleFavorite={onToggleFavorite} />}
      {data.Short_Form_Video && data.Voiceover && <ShortFormVideoSection videoData={data.Short_Form_Video} voiceoverData={data.Voiceover} />}
      {data.investorMetrics && <InvestorMetricsSection data={data.investorMetrics} />}
      {(data.stagingPresets || data.imageGenPrompts) && <StagingAndImagePromptsSection presets={data.stagingPresets || []} prompts={data.imageGenPrompts || []} isApiKeyMissing={isApiKeyMissing} />}
      {data.platformPacks && <PlatformPacksSection packs={data.platformPacks} />}
      {data.seo && <SeoSection data={data.seo} />}
    </div>
  );
};

export default AdKitDisplay;