import React from 'react';
import { ImageGenPrompt, StagingPreset } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';

interface StagingAndImagePromptsSectionProps {
  presets: StagingPreset[];
  prompts: ImageGenPrompt[];
}

export const StagingAndImagePromptsSection: React.FC<StagingAndImagePromptsSectionProps> = ({ presets, prompts }) => {
  return (
    <Accordion title="Virtual Staging & Image Prompts" icon={<Icons.image />}>
        <div className="space-y-6">
             <div>
                <h4 className="font-semibold text-lg font-display text-indigo-400 mb-3">AI Image Generation Prompts</h4>
                <div className="space-y-3">
                    {prompts.map((p, index) => (
                        <div key={index} className="bg-slate-800/50 p-3 rounded-lg relative">
                            <CopyButton textToCopy={p.prompt} />
                            <p className="font-semibold text-slate-300">{p.useCase}</p>
                            <p className="text-sm text-slate-400 italic">"{p.prompt}"</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-lg font-display text-indigo-400 mb-3">Virtual Staging Ideas</h4>
                <div className="space-y-3">
                    {presets.map((preset, index) => (
                        <div key={index} className="bg-slate-800/50 p-3 rounded-lg relative">
                            <CopyButton textToCopy={preset.prompt} />
                            <p className="font-semibold text-slate-300">{preset.style}</p>
                            <p className="text-sm text-slate-400 italic">"{preset.prompt}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Accordion>
  );
};