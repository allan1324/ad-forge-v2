import React from 'react';
import { SeoData } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';
import { Tooltip } from '../ui/Tooltip';

interface SeoSectionProps {
  data: SeoData;
}

export const SeoSection: React.FC<SeoSectionProps> = ({ data }) => {
  return (
    <Accordion 
        id="seo"
        title={
            <div className="af-flex af-items-center af-gap-2">
                <span>SEO Snippets</span>
                <Tooltip content="Search Engine Optimization content to help this property rank higher in online searches on platforms like Google.">
                    <Icons.info className="af-h-4 af-w-4 af-text-text-lo af-cursor-help" />
                </Tooltip>
            </div>
        }
        icon={<Icons.search />}
    >
        <div className="af-space-y-4">
            <div className="af-group af-bg-surface af-border af-border-line af-p-3 af-rounded-lg">
                <div className="af-flex af-justify-between af-items-start">
                    <h5 className="af-text-xs af-text-text-lo af-uppercase af-tracking-wider">Meta Title</h5>
                    <CopyButton textToCopy={data.metaTitle} className="-af-mt-1 -af-mr-1 af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                </div>
                <p className="af-text-text-hi">{data.metaTitle}</p>
            </div>
            <div className="af-group af-bg-surface af-border af-border-line af-p-3 af-rounded-lg">
                <div className="af-flex af-justify-between af-items-start">
                    <h5 className="af-text-xs af-text-text-lo af-uppercase af-tracking-wider">Meta Description</h5>
                    <CopyButton textToCopy={data.metaDescription} className="-af-mt-1 -af-mr-1 af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                </div>
                <p className="af-text-text-lo">{data.metaDescription}</p>
            </div>
            <div className="af-group">
                <div className="af-flex af-justify-between af-items-start af-mb-2">
                    <h5 className="af-text-xs af-text-text-lo af-uppercase af-tracking-wider">Keywords</h5>
                    <CopyButton textToCopy={data.keywords.join(', ')} className="af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                </div>
                <div className="af-flex af-flex-wrap af-gap-2">
                {data.keywords.map((keyword, index) => (
                    <span key={index} className="af-bg-panel af-border af-border-line af-text-text-lo af-text-xs af-px-2 af-py-1 af-rounded">
                        {keyword}
                    </span>
                ))}
                </div>
            </div>
        </div>
    </Accordion>
  );
};