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
                <label className="af-block af-text-xs af-font-medium af-text-text-lo af-mb-1">{label}</label>
                <div className="af-w-full af-bg-surface af-border af-border-line af-text-text-lo af-rounded-md af-px-3 af-py-1.5 af-text-sm af-min-h-[34px] af-flex af-items-center">
                    {displayValue}
                </div>
            </div>
        );
    };

    const OtherSetting = ({ label, value }: { label: string, value: string | number | undefined }) => {
        if (!value) return null;
        return (
            <div className="af-text-xs af-bg-panel af-border af-border-line af-text-text-lo af-px-2 af-py-1 af-rounded">
                {label}: <strong className="af-text-text-hi">{value}</strong>
            </div>
        );
    };

    return (
        <div className="af-bg-surface af-p-4 af-rounded-lg af-border af-border-line af-space-y-3 af-flex af-flex-col">
            <div className="af-flex af-justify-between af-items-start af-gap-2">
                <h5 className="af-font-bold af-font-display af-text-lg af-text-accent">
                    Clip {clip.id}: <span className="af-text-base af-font-normal af-text-text-hi">"{clip.on_screen_text}"</span>
                </h5>
                <CopyButton textToCopy={clip.prompt} className="-af-mt-1 -af-mr-1" />
            </div>
            
            <blockquote className="af-text-sm af-text-text-lo af-italic af-border-l-2 af-border-line af-pl-3">"{clip.prompt}"</blockquote>

            <div className="af-flex af-flex-wrap af-gap-2 af-pt-1">
                {clip.continuity_tags.map(tag => (
                    <span key={tag} className="af-text-xs af-bg-panel af-border af-border-line af-text-text-lo af-px-2 af-py-1 af-rounded-full">{tag}</span>
                ))}
            </div>

            <div className="af-text-sm af-text-text-lo af-space-y-1">
                 <p><strong className="af-text-text-hi af-font-medium">SFX:</strong> {clip.sfx_suggestion || 'Not specified'}</p>
                 <p><strong className="af-text-text-hi af-font-medium">Transition:</strong> {clip.transition_to_next || 'Not specified'}</p>
            </div>
            
            <div className="af-flex-grow" />

            {clip.sora_settings && (
                <details className="af-group af-text-sm af-pt-2" open>
                    <summary className="af-list-none af-flex af-justify-between af-items-center af-cursor-pointer af-text-accent hover:af-text-accent/80 af-transition">
                        <span className="af-font-semibold">Advanced Generation Settings</span>
                        <Icons.chevronRight className="af-h-4 af-w-4 af-transition-transform af-duration-200 group-open:af-rotate-90" />
                    </summary>
                    <div className="af-p-2 af-mt-2 af-bg-surface af-rounded af-space-y-3 af-border af-border-line">
                        <div className="af-grid af-grid-cols-1 sm:af-grid-cols-2 af-gap-3">
                            <SettingDisplay label="Camera" value={clip.sora_settings.camera} />
                            <SettingDisplay label="Lighting" value={clip.sora_settings.lighting} />
                        </div>
                        <div>
                            <SettingDisplay label="Negative Prompts" value={clip.sora_settings.negatives} />
                        </div>
                        <div className="af-flex af-flex-wrap af-gap-2 af-items-center af-text-xs">
                            <h6 className="af-font-semibold af-text-text-lo af-w-full af-text-xs af-mb-1">Other Settings:</h6>
                            <OtherSetting label="Duration" value={`${clip.sora_settings.duration_seconds}s`} />
                            <OtherSetting label="AR" value={clip.sora_settings.ar} />
                            <OtherSetting label="FPS" value={clip.sora_settings.fps} />
                            <OtherSetting label="Motion" value={clip.sora_settings.motion} />
                        </div>
                    </div>
                </details>
            )}

             {clip.alt_variations && clip.alt_variations.length > 0 && (
                 <details className="af-group af-text-sm af-pt-2">
                    <summary className="af-list-none af-flex af-justify-between af-items-center af-cursor-pointer af-text-accent hover:af-text-accent/80 af-transition">
                      <span className="af-font-semibold">Alternative Variations</span>
                      <Icons.chevronRight className="af-h-4 af-w-4 af-transition-transform af-duration-200 group-open:af-rotate-90" />
                    </summary>
                    <ul className="af-list-disc af-list-inside af-p-3 af-mt-2 af-bg-surface af-border af-border-line af-rounded af-text-text-lo af-text-xs af-space-y-2">
                        {clip.alt_variations.map((alt, i) => (
                            <li key={i} className="af-flex af-justify-between af-items-center af-gap-2">
                                <span className="af-flex-1">{alt}</span>
                                <CopyButton textToCopy={alt} />
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
        <div className="af-space-y-6">
            <div className="af-group">
                <div className="af-flex af-justify-between af-items-start af-mb-2">
                    <h4 className="af-font-semibold af-text-lg af-font-display af-text-accent">30-Second Voiceover Script</h4>
                    <CopyButton textToCopy={voiceoverData['30s_VO']} className="af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                </div>
                <div className="af-bg-surface af-border af-border-line af-p-4 af-rounded-lg">
                    <p className="af-text-text-lo af-whitespace-pre-wrap">{voiceoverData['30s_VO']}</p>
                </div>
            </div>
            <div>
                <h4 className="af-font-semibold af-text-lg af-font-display af-text-accent af-mb-3">Sora Clip Prompts (6 x 5s)</h4>
                 <div className="af-grid af-grid-cols-1 md:af-grid-cols-2 af-gap-4">
                    {videoData.Clip_Prompts_6x5s.map((clip) => (
                        <ClipPromptCard key={clip.id} clip={clip} />
                    ))}
                </div>
            </div>
        </div>
    </Accordion>
  );
};