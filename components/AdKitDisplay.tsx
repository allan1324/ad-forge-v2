import React, { useState, useEffect } from 'react';
import type { AdKitData, PersonaVariant } from '../types';
import { DataReview } from './sections/DataReview';
import { InsightsSection } from './sections/InsightsSection';
import { InvestorMetricsSection } from './sections/InvestorMetricsSection';
import { PersonaVariantsSection } from './sections/PersonaVariantsSection';
import { VideoPlanSection } from './sections/VideoPlanSection';
import { StagingAndImagePromptsSection } from './sections/StagingAndImagePromptsSection';
import { PlatformPacksSection } from './sections/PlatformPacksSection';
import { SeoSection } from './sections/SeoSection';
import { ExportSection } from './sections/ExportSection';
import { QuestionsSection } from './sections/QuestionsSection';
import { Accordion } from './ui/Accordion';
import { Icons } from './ui/Icons';

interface AdKitDisplayProps {
  data: AdKitData;
  onBack: () => void;
  imageUrls?: string[];
}

const PropertyImagesSection: React.FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <Accordion title="Fetched Property Images" icon={<Icons.image />} defaultOpen={true}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {imageUrls.map((url, index) => (
          <a href={url} target="_blank" rel="noopener noreferrer" key={index} className="group aspect-square block bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 hover:z-10">
            <img
              src={url}
              alt={`Fetched property image ${index + 1}`}
              className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.img-error')) {
                   const errorDiv = document.createElement('div');
                   errorDiv.className = 'img-error w-full h-full flex items-center justify-center text-slate-500 text-xs text-center p-1';
                   errorDiv.innerText = 'Image failed';
                   parent.appendChild(errorDiv);
                }
              }}
            />
          </a>
        ))}
      </div>
    </Accordion>
  );
};

const FavoritesSection: React.FC<{ variants: PersonaVariant[], favoritedPersonas: string[] }> = ({ variants, favoritedPersonas }) => {
  const favoritedVariants = variants.filter(v => favoritedPersonas.includes(v.persona));

  if (favoritedVariants.length === 0) {
    return null;
  }

  return (
    <Accordion title="Favorited Ad Copy" icon={<Icons.starSolid className="text-yellow-400" />} defaultOpen={true}>
      <div className="space-y-4">
        {favoritedVariants.map((variant) => (
          <div key={variant.persona} className="bg-slate-800/50 p-4 rounded-lg">
            <h4 className="font-bold text-lg font-display text-indigo-400 mb-2">{variant.persona}</h4>
            <p className="text-sm text-slate-300 whitespace-pre-wrap"><strong className="text-slate-100">Headline:</strong> {variant.headline}</p>
            <p className="mt-2 text-sm text-slate-300 whitespace-pre-wrap">{variant.primaryText}</p>
          </div>
        ))}
      </div>
    </Accordion>
  );
};

const AdKitDisplay: React.FC<AdKitDisplayProps> = ({ data, onBack, imageUrls }) => {
  const [favoritedPersonas, setFavoritedPersonas] = useState<string[]>([]);

  useEffect(() => {
    try {
        const savedFavorites = localStorage.getItem('favoritedPersonas');
        if (savedFavorites) {
            setFavoritedPersonas(JSON.parse(savedFavorites));
        }
    } catch (e) {
        console.error("Failed to parse favorites from localStorage", e);
    }
  }, []);

  const handleToggleFavorite = (persona: string) => {
    setFavoritedPersonas(prev => {
      const newFavorites = prev.includes(persona)
        ? prev.filter(p => p !== persona)
        : [...prev, persona];
      localStorage.setItem('favoritedPersonas', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-4xl lg:text-5xl font-bold font-display text-white">Your Ad Kit is Ready</h1>
        <button
          onClick={onBack}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 flex-shrink-0"
        >
          &larr; Start Over
        </button>
      </div>

      {data.questionsToConfirm && data.questionsToConfirm.length > 0 && (
          <QuestionsSection questions={data.questionsToConfirm} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {imageUrls && imageUrls.length > 0 && <PropertyImagesSection imageUrls={imageUrls} />}
            {data.extractedData && <DataReview data={data.extractedData} />}
            {data.insights && <InsightsSection data={data.insights} />}
            {data.personaVariants && data.personaVariants.length > 0 && (
                <PersonaVariantsSection 
                    variants={data.personaVariants} 
                    favoritedPersonas={favoritedPersonas}
                    onToggleFavorite={handleToggleFavorite}
                />
            )}
            {data.videoPlan && <VideoPlanSection plan={data.videoPlan} />}
        </div>
        <div className="space-y-8">
            <ExportSection data={data} />
            {data.personaVariants && favoritedPersonas.length > 0 && (
                <FavoritesSection variants={data.personaVariants} favoritedPersonas={favoritedPersonas} />
            )}
            {data.investorMetrics && <InvestorMetricsSection data={data.investorMetrics} />}
            {(data.stagingPresets?.length > 0 || data.imageGenPrompts?.length > 0) && (
              <StagingAndImagePromptsSection 
                presets={data.stagingPresets || []} 
                prompts={data.imageGenPrompts || []} 
              />
            )}
            {data.platformPacks && data.platformPacks.length > 0 && <PlatformPacksSection packs={data.platformPacks} />}
            {data.seo && <SeoSection data={data.seo} />}
        </div>
      </div>
    </div>
  );
};

export default AdKitDisplay;