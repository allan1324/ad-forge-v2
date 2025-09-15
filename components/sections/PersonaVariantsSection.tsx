import React from 'react';
import { PersonaVariant } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';
import { Tooltip } from '../ui/Tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';

interface PersonaVariantsSectionProps {
  variants: PersonaVariant[];
  favoritedPersonas: string[];
  onToggleFavorite: (persona: string) => void;
}

export const PersonaVariantsSection: React.FC<PersonaVariantsSectionProps> = ({ variants, favoritedPersonas, onToggleFavorite }) => {
  if (!variants || variants.length === 0) {
      return null;
  }

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

  return (
    <Accordion 
        id="personas"
        title={
            <div className="af-flex af-items-center af-gap-2">
                <span>Persona-Based Ad Copy</span>
                <Tooltip content="Tailored ad copy targeting different potential buyer profiles (e.g., first-time homebuyers, investors) to increase engagement.">
                    <Icons.info className="af-h-4 af-w-4 af-text-text-lo af-cursor-help" />
                </Tooltip>
            </div>
        }
        icon={<Icons.users />} 
        defaultOpen={true}
    >
      <Tabs defaultValue={variants[0].persona}>
        <TabsList>
          {variants.map(v => <TabsTrigger key={v.persona} value={v.persona}>{v.persona}</TabsTrigger>)}
        </TabsList>
        {variants.map(variant => {
          const isFavorited = favoritedPersonas.includes(variant.persona);
          return (
            <TabsContent key={variant.persona} value={variant.persona} className="af-space-y-4 af-p-4 af-bg-surface af-border af-border-line af-rounded-lg">
              <div className="af-flex af-justify-end af-items-center af-gap-2">
                <Tooltip content="Copy all text for this persona">
                  <CopyButton textToCopy={copyAllText(variant)} />
                </Tooltip>
                <Tooltip content={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>
                  <button
                      onClick={() => onToggleFavorite(variant.persona)}
                      className="af-p-2 af-rounded-full hover:af-bg-panel af-transition-colors"
                      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                      {isFavorited ? (
                          <Icons.starSolid className="af-h-5 af-w-5 af-text-yellow-400" />
                      ) : (
                          <Icons.star className="af-h-5 af-w-5 af-text-text-lo hover:af-text-yellow-400" />
                      )}
                  </button>
                </Tooltip>
              </div>
              
              <div className="af-group af-p-3 af-bg-panel af-rounded-lg af-border af-border-line">
                  <div className="af-flex af-justify-between af-items-start">
                    <p className="af-text-xs af-text-text-lo af-uppercase af-tracking-wider">Hook</p>
                    <CopyButton textToCopy={variant.hook} className="-af-mr-1 -af-mt-1 af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                  </div>
                  <p className="af-text-accent af-font-semibold">{variant.hook}</p>
              </div>
              <div className="af-group af-p-3 af-bg-panel af-rounded-lg af-border af-border-line">
                  <div className="af-flex af-justify-between af-items-start">
                    <p className="af-text-xs af-text-text-lo af-uppercase af-tracking-wider">Headline</p>
                    <CopyButton textToCopy={variant.headline} className="-af-mr-1 -af-mt-1 af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                  </div>
                  <p className="af-font-bold af-text-lg af-text-text-hi">{variant.headline}</p>
              </div>
               <div className="af-group af-p-3 af-bg-panel af-rounded-lg af-border af-border-line">
                  <div className="af-flex af-justify-between af-items-start">
                    <p className="af-text-xs af-text-text-lo af-uppercase af-tracking-wider">Primary Text</p>
                    <CopyButton textToCopy={variant.primaryText} className="-af-mr-1 -af-mt-1 af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                  </div>
                  <p className="af-text-text-lo af-whitespace-pre-wrap">{variant.primaryText}</p>
              </div>
               <div className="af-group af-p-3 af-bg-panel af-rounded-lg af-border af-border-line">
                  <div className="af-flex af-justify-between af-items-start">
                    <p className="af-text-xs af-text-text-lo af-uppercase af-tracking-wider">Call to Action (CTA)</p>
                    <CopyButton textToCopy={variant.cta} className="-af-mr-1 -af-mt-1 af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                  </div>
                  <p className="af-font-semibold af-text-text-hi">{variant.cta}</p>
              </div>
              <div className="af-group">
                  <div className="af-flex af-justify-between af-items-start">
                    <h5 className="af-text-xs af-text-text-lo af-uppercase af-tracking-wider af-mb-2">Hashtags</h5>
                    <CopyButton textToCopy={variant.hashtags.join(' ')} className="-af-mr-1 -af-mt-1 af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                  </div>
                  <div className="af-flex af-flex-wrap af-gap-2">
                  {variant.hashtags.map((tag, index) => (
                      <span key={index} className="af-bg-badge af-text-accent af-text-xs af-px-2 af-py-1 af-rounded-full">
                      {tag}
                      </span>
                  ))}
                  </div>
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </Accordion>
  );
};