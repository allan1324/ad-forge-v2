

import React from 'react';
import { SoraClipPrompt } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';

interface ShortFormVideoSectionProps {
  videoData: {
      Clip_Prompts_6x5s: SoraClipPrompt[];
  };
  voiceoverData: {
      "30s_VO": string;
  };
}

const ClipPromptCard: React.FC<{ clip: SoraClipPrompt }> = ({ clip }) => {

    const SettingDisplay = ({ label, value }: { label: string, value: string | string[] | number | null | undefined }) => {
        let displayValue: string;
        if (value === null || value === undefined || value === '') {
            displayValue = 'Not specified';
        } else if (Array.isArray(value)) {
            displayValue = value.length > 0 ? value.join(', ') : 'None';
        } else {
            displayValue = String(value);
        }
        
        return (
            <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
                <div className="w-full bg-slate-900/70 border border-slate-700 text-slate-300 rounded-md px-3 py-1.5 text-sm min-h-[34px] flex items-center">
                    {displayValue}
                </div>
            </div>
        );
    };

    const OtherSetting = ({ label, value }: { label: string, value: string | number | undefined }) => {
        if (!value) return null;
        return (
            <div className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded">
                {label}: <strong className="text-slate-300">{value}</strong>
            </div>
        );
    };

    return (
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 space-y-3">
            <div className="flex justify-between items-start gap-2">
                <h5 className="font-bold font-display text-indigo-400 pr-10">
                    Clip {clip.id}: <span className="text-base font-normal text-slate-200">"{clip.on_screen_text}"</span>
                </h5>
                <CopyButton textToCopy={clip.prompt} />
            </div>
            
            <p className="text-sm text-slate-300 italic">"{clip.prompt}"</p>

            <div className="flex flex-wrap gap-2 pt-1">
                {clip.continuity_tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>

            <div className="text-sm text-slate-400 space-y-1">
                 <p><strong className="text-slate-300 font-medium">SFX:</strong> {clip.sfx_suggestion || 'Not specified'}</p>
                 <p><strong className="text-slate-300 font-medium">Transition:</strong> {clip.transition_to_next || 'Not specified'}</p>
            </div>
            
            {clip.sora_settings && (
                <details className="text-sm pt-2" open>
                    <summary className="cursor-pointer text-indigo-400 hover:text-indigo-300 transition list-inside">
                        <span className="font-semibold">Advanced Generation Settings</span>
                    </summary>
                    <div className="p-2 mt-2 bg-slate-900/50 rounded space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <SettingDisplay label="Camera" value={clip.sora_settings.camera} />
                            <SettingDisplay label="Lighting" value={clip.sora_settings.lighting} />
                        </div>
                        <div>
                            <SettingDisplay label="Negative Prompts" value={clip.sora_settings.negatives} />
                        </div>
                        <div className="flex flex-wrap gap-2 items-center text-xs">
                            <h6 className="font-semibold text-slate-400 w-full text-xs mb-1">Other Settings:</h6>
                            <OtherSetting label="Duration" value={`${clip.sora_settings.duration_seconds}s`} />
                            <OtherSetting label="AR" value={clip.sora_settings.ar} />
                            <OtherSetting label="FPS" value={clip.sora_settings.fps} />
                            <OtherSetting label="Motion" value={clip.sora_settings.motion} />
                        </div>
                    </div>
                </details>
            )}

             {clip.alt_variations && clip.alt_variations.length > 0 && (
                 <details className="text-sm pt-2">
                    <summary className="cursor-pointer text-indigo-400 hover:text-indigo-300 transition font-semibold">Alternative Variations</summary>
                    <ul className="list-disc list-inside p-2 mt-2 bg-slate-900/50 rounded text-slate-400 text-xs space-y-2">
                        {clip.alt_variations.map((alt, i) => (
                            <li key={i} className="relative pr-10">
                                {alt}
                                <CopyButton textToCopy={alt} className="top-1/2 -translate-y-1/2 right-1 p-1 h-7 w-7" />
                            </li>
                        ))}
                    </ul>
                </details>
            )}
        </div>
    );
};

export const ShortFormVideoSection: React.FC<ShortFormVideoSectionProps> = ({ videoData, voiceoverData }) => {
  return (
    <Accordion title="Short-Form Video Ad Plan" icon={<Icons.video />} defaultOpen={true} id="video">
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-lg font-display text-indigo-400 mb-2">30-Second Voiceover Script</h4>
                <div className="relative bg-slate-800/50 p-4 rounded-lg">
                    <CopyButton textToCopy={voiceoverData['30s_VO']} />
                    <p className="text-slate-300 whitespace-pre-wrap pr-10">{voiceoverData['30s_VO']}</p>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-lg font-display text-indigo-400 mb-3">Sora Clip Prompts (6 x 5s)</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videoData.Clip_Prompts_6x5s.map((clip) => (
                        <ClipPromptCard key={clip.id} clip={clip} />
                    ))}
                </div>
            </div>
        </div>
    </Accordion>
  );
};