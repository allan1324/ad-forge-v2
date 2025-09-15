import React from 'react';
import { VideoPlan } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';

interface VideoPlanSectionProps {
  plan: VideoPlan;
}

export const VideoPlanSection: React.FC<VideoPlanSectionProps> = ({ plan }) => {
  return (
    <Accordion title="30-Second Video Ad Plan" icon={<Icons.video />}>
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-lg font-display text-indigo-400 mb-3">Storyboard</h4>
                <div className="space-y-4">
                    {plan.storyboard.map((beat, index) => (
                        <div key={index} className="flex gap-4 p-3 bg-slate-800/50 rounded-lg">
                            <div className="flex-shrink-0 w-16 text-center">
                                <p className="font-bold text-lg text-indigo-300">{beat.timestamp}</p>
                            </div>
                            <div className="border-l border-slate-700 pl-4">
                                <p><strong className="text-slate-300">Visual:</strong> {beat.visual}</p>
                                <p><strong className="text-slate-300">V.O.:</strong> <em className="text-slate-400">"{beat.vo}"</em></p>
                                <p><strong className="text-slate-300">Text:</strong> <span className="font-mono bg-slate-700 px-1 rounded text-sm text-yellow-300">{beat.overlayText}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative">
                <h4 className="font-semibold text-lg font-display text-indigo-400 mb-3">Sora Handoff JSON</h4>
                <CopyButton textToCopy={JSON.stringify(plan.soraHandoff, null, 2)} />
                <pre className="bg-slate-900 text-sm text-green-300 p-4 rounded-lg max-h-96 overflow-auto">
                    <code>{JSON.stringify(plan.soraHandoff, null, 2)}</code>
                </pre>
            </div>
        </div>
    </Accordion>
  );
};