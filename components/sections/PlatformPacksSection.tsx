import React from 'react';
import { PlatformContent } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';

interface PlatformPacksSectionProps {
  packs: PlatformContent[];
}

export const PlatformPacksSection: React.FC<PlatformPacksSectionProps> = ({ packs }) => {
  return (
    <Accordion title="Social Media Platform Packs" icon={<Icons.share />} id="platforms">
        <div className="space-y-4">
            {packs.map((pack, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="font-bold text-lg text-white">{pack.platform}</h5>
                        <p className="text-xs text-slate-400">Limit: {pack.charLimit}</p>
                    </div>
                    <div className="relative bg-slate-900/40 p-3 rounded-md border border-slate-700/50">
                        <CopyButton textToCopy={pack.copy} />
                        <p className="text-slate-300 whitespace-pre-wrap pr-10">{pack.copy}</p>
                    </div>
                </div>
            ))}
        </div>
    </Accordion>
  );
};