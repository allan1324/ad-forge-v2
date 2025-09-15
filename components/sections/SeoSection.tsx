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
            <div className="flex items-center gap-2">
                <span>SEO Snippets</span>
                <Tooltip content="Search Engine Optimization content to help this property rank higher in online searches on platforms like Google.">
                    <Icons.info className="h-4 w-4 text-slate-400 cursor-help" />
                </Tooltip>
            </div>
        }
        icon={<Icons.search />}
    >
        <div className="space-y-4">
            <div className="bg-slate-800/50 p-3 rounded-lg relative">
                <CopyButton textToCopy={data.metaTitle} />
                <h5 className="text-xs text-slate-400 uppercase tracking-wider">Meta Title</h5>
                <p className="text-white">{data.metaTitle}</p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg relative">
                <CopyButton textToCopy={data.metaDescription} />
                <h5 className="text-xs text-slate-400 uppercase tracking-wider">Meta Description</h5>
                <p className="text-slate-300">{data.metaDescription}</p>
            </div>
            <div>
                <h5 className="text-xs text-slate-400 uppercase tracking-wider mb-2">Keywords</h5>
                <div className="flex flex-wrap gap-2">
                {data.keywords.map((keyword, index) => (
                    <span key={index} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
                        {keyword}
                    </span>
                ))}
                </div>
            </div>
        </div>
    </Accordion>
  );
};