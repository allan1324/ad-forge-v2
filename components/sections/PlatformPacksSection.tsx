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
    <Accordion title="Social Media Platform Packs" icon={<Icons.share />}>
        <div className="space-y-4">
            {packs.map((pack, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg relative">
                    <CopyButton textToCopy={pack.copy} />
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="font-bold text-lg text-white">{pack.platform}</h5>
                        <p className="text-xs text-slate-400">Limit: {pack.charLimit}</p>
                    </div>
                    <p className="text-slate-300 whitespace-pre-wrap">{pack.copy}</p>
                </div>
            ))}
        </div>
    </Accordion>
  );
};