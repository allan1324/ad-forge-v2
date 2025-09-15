


// FIX: Import useState from React
import React, { useState } from 'react';
import { PersonaVariant } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';
import { Tooltip } from '../ui/Tooltip';

interface PersonaVariantsSectionProps {
  variants: PersonaVariant[];
  favoritedPersonas: string[];
  onToggleFavorite: (persona: string) => void;
}

export const PersonaVariantsSection: React.FC<PersonaVariantsSectionProps> = ({ variants, favoritedPersonas, onToggleFavorite }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!variants || variants.length === 0) {
      return null;
  }

  const activeVariant = variants[activeTab];

  const copyAllText = (variant: PersonaVariant) => {
    return `
Persona: ${variant.persona}
Hook: ${variant.hook}
Headline: ${variant.headline}
Primary Text: ${variant.primaryText}
CTA: ${variant.cta}
Hashtags: ${variant.hashtags.join(' ')}
    `.trim();
  };
  
  const isFavorited = activeVariant && favoritedPersonas.includes(activeVariant.persona);

  return (
    <Accordion 
        id="personas"
        title={
            <div className="flex items-center gap-2">
                <span>Persona-Based Ad Copy</span>
                <Tooltip content="Tailored ad copy targeting different potential buyer profiles (e.g., first-time homebuyers, investors) to increase engagement.">
                    <Icons.info className="h-4 w-4 text-slate-400 cursor-help" />
                </Tooltip>
            </div>
        }
        icon={<Icons.users />} 
        defaultOpen={true}
    >
        <div className="p-1.5 bg-slate-800/50 rounded-lg flex flex-wrap sm:flex-nowrap gap-1.5 overflow-x-auto mb-4">
            {variants.map((variant, index) => (
            <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 sm:flex-none py-2 px-4 text-sm font-medium rounded-md transition whitespace-nowrap ${
                activeTab === index
                    ? 'bg-slate-700 text-white shadow'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                }`}
            >
                {variant.persona}
            </button>
            ))}
        </div>
        
        {activeVariant && (
            <div className="space-y-4 relative p-4 bg-slate-900/50 rounded-lg">
                <div className="absolute top-2 right-12 flex items-center gap-2" title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>
                    <button
                        onClick={() => onToggleFavorite(activeVariant.persona)}
                        className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
                        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isFavorited ? (
                            <Icons.starSolid className="h-6 w-6 text-yellow-400" />
                        ) : (
                            <Icons.star className="h-6 w-6 text-slate-400 hover:text-yellow-400" />
                        )}
                    </button>
                </div>

                <CopyButton textToCopy={copyAllText(activeVariant)} />
                <div className="relative p-3 bg-slate-800/50 rounded-lg">
                    <CopyButton textToCopy={activeVariant.hook} />
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Hook</p>
                    <p className="text-indigo-300 font-semibold pr-10">{activeVariant.hook}</p>
                </div>
                <div className="relative p-3 bg-slate-800/50 rounded-lg">
                    <CopyButton textToCopy={activeVariant.headline} />
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Headline</p>
                    <p className="font-bold text-lg pr-10">{activeVariant.headline}</p>
                </div>
                 <div className="relative p-3 bg-slate-800/50 rounded-lg">
                    <CopyButton textToCopy={activeVariant.primaryText} />
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Primary Text</p>
                    <p className="text-slate-300 whitespace-pre-wrap pr-10">{activeVariant.primaryText}</p>
                </div>
                 <div className="relative p-3 bg-slate-800/50 rounded-lg">
                    <CopyButton textToCopy={activeVariant.cta} />
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Call to Action (CTA)</p>
                    <p className="font-semibold text-white pr-10">{activeVariant.cta}</p>
                </div>
                <div className="relative">
                    <CopyButton textToCopy={activeVariant.hashtags.join(' ')} />
                    <h5 className="text-xs text-slate-400 uppercase tracking-wider mb-2">Hashtags</h5>
                    <div className="flex flex-wrap gap-2 pr-10">
                    {activeVariant.hashtags.map((tag, index) => (
                        <span key={index} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
                        {tag}
                        </span>
                    ))}
                    </div>
                </div>
            </div>
        )}
    </Accordion>
  );
};