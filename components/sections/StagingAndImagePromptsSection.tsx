import React, { useState } from 'react';
import { ImageGenPrompt, StagingPreset } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';
import { Button } from '../ui/Button';
import { generateImage } from '../../services/geminiService';
import { Alert, AlertDescription } from '../ui/Alert';

// Define state structure for each prompt
interface ImageState {
  isLoading: boolean;
  imageData: string | null;
  error: string | null;
}

// The component to handle a single prompt
const PromptCard: React.FC<{ 
  title: string; 
  prompt: string;
  isApiKeyMissing: boolean;
}> = ({ title, prompt, isApiKeyMissing }) => {
  const [state, setState] = useState<ImageState>({
    isLoading: false,
    imageData: null,
    error: null,
  });

  const handleGenerate = async () => {
    if (isApiKeyMissing) return;
    setState({ isLoading: true, imageData: null, error: null });
    try {
      const imageData = await generateImage(prompt);
      setState({ isLoading: false, imageData, error: null });
    } catch (e: any) {
      setState({ isLoading: false, imageData: null, error: e.message || 'Failed to generate image.' });
    }
  };

  return (
    <div className="af-bg-surface af-p-4 af-rounded-lg af-relative af-transition-all af-border af-border-line af-space-y-3">
      <div className="af-flex af-justify-between af-items-start af-gap-4">
        <div>
          <p className="af-font-semibold af-text-text-hi af-font-display">{title}</p>
          <p className="af-text-sm af-text-text-lo af-italic af-pr-10">"{prompt}"</p>
        </div>
        <CopyButton textToCopy={prompt} />
      </div>

      <div>
        <Button onClick={handleGenerate} variant="secondary" size="sm" disabled={state.isLoading || isApiKeyMissing}>
          {state.isLoading 
            ? <Icons.spinner className="af-animate-spin af-h-4 af-w-4" /> 
            : <Icons.wand className="af-h-4 af-w-4 af-text-accent" />
          }
          <span className="af-ml-2">{state.isLoading ? 'Generating...' : (state.imageData ? 'Regenerate' : 'Generate Image')}</span>
        </Button>
      </div>

      {state.imageData && !state.isLoading && (
        <a href={state.imageData} target="_blank" rel="noopener noreferrer" className="af-block af-mt-4 af-aspect-video af-bg-ink af-rounded-md af-overflow-hidden af-border af-border-line hover:af-border-accent af-transition af-group">
          <img src={state.imageData} alt={prompt} className="af-w-full af-h-full af-object-contain af-transition-transform af-duration-300 group-hover:af-scale-105" />
        </a>
      )}

      {state.error && (
        <Alert variant="destructive" className="af-mt-3 af-p-2 af-text-xs">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};


interface StagingAndImagePromptsSectionProps {
  presets: StagingPreset[];
  prompts: ImageGenPrompt[];
  isApiKeyMissing: boolean;
}

export const StagingAndImagePromptsSection: React.FC<StagingAndImagePromptsSectionProps> = ({ presets, prompts, isApiKeyMissing }) => {
  return (
    <Accordion title="Virtual Staging & Image Prompts" icon={<Icons.image />} id="staging">
        <div className="af-space-y-8">
             <div>
                <h4 className="af-font-semibold af-text-lg af-font-display af-text-accent af-mb-3">AI Image Generation Prompts</h4>
                {prompts && prompts.length > 0 ? (
                  <div className="af-space-y-4">
                      {prompts.map((p, index) => (
                          <PromptCard key={`prompt-${index}`} title={p.useCase} prompt={p.prompt} isApiKeyMissing={isApiKeyMissing} />
                      ))}
                  </div>
                ) : <p className="af-text-text-lo af-text-sm">No image generation prompts were created.</p>}
            </div>
            <div>
                <h4 className="af-font-semibold af-text-lg af-font-display af-text-accent af-mb-3">Virtual Staging Ideas</h4>
                 {presets && presets.length > 0 ? (
                  <div className="af-space-y-4">
                      {presets.map((preset, index) => (
                          <PromptCard key={`preset-${index}`} title={preset.style} prompt={preset.prompt} isApiKeyMissing={isApiKeyMissing} />
                      ))}
                  </div>
                ) : <p className="af-text-text-lo af-text-sm">No virtual staging presets were created.</p>}
            </div>
        </div>
    </Accordion>
  );
};