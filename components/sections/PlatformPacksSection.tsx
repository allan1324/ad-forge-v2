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
        <div className="af-space-y-4">
            {packs.map((pack, index) => (
                <div key={index} className="af-bg-surface af-border af-border-line af-p-4 af-rounded-lg">
                    <div className="af-flex af-justify-between af-items-center af-mb-2">
                        <h5 className="af-font-bold af-text-lg af-text-text-hi">{pack.platform}</h5>
                        <p className="af-text-xs af-text-text-lo">Limit: {pack.charLimit}</p>
                    </div>
                    <div className="af-group af-bg-panel af-p-3 af-rounded-md af-border af-border-line">
                        <div className="af-flex af-justify-between af-items-start">
                            <p className="af-text-text-lo af-whitespace-pre-wrap af-flex-1">{pack.copy}</p>
                            <CopyButton textToCopy={pack.copy} className="af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Accordion>
  );
};