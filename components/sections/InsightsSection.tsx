import React from 'react';
import { Insights } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';

interface InsightsSectionProps {
  data: Insights;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ data }) => {
  return (
    <Accordion title="Market Insights" icon={<Icons.lightbulb />} id="insights">
        <div className="af-space-y-6">
            <div className="af-group">
                <div className="af-flex af-justify-between af-items-start">
                    <h4 className="af-font-semibold af-text-lg af-font-display af-text-accent af-mb-2">Neighborhood Summary</h4>
                    <CopyButton textToCopy={data.neighborhoodSummary} className="af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                </div>
                <p className="af-text-text-lo">{data.neighborhoodSummary}</p>
            </div>
            <div className="af-group">
                <div className="af-flex af-justify-between af-items-start">
                    <h4 className="af-font-semibold af-text-lg af-font-display af-text-accent af-mb-2">Price Position Analysis</h4>
                    <CopyButton textToCopy={`${data.pricePosition}\n\n${data.priceRationale}`} className="af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                </div>
                <div className="af-bg-surface af-border af-border-line af-p-4 af-rounded-lg">
                    <p className="af-font-bold af-text-xl af-text-text-hi">{data.pricePosition}</p>
                    <p className="af-text-text-lo">{data.priceRationale}</p>
                </div>
            </div>
            <div className="af-group">
                <div className="af-flex af-justify-between af-items-start">
                    <h4 className="af-font-semibold af-text-lg af-font-display af-text-accent af-mb-2">Suggested Stock Search Queries</h4>
                    <CopyButton textToCopy={data.stockSearchQueries.join('\n')} className="af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                </div>
                <ul className="af-list-disc af-list-inside af-text-text-lo af-space-y-1">
                {data.stockSearchQueries.map((query, index) => (
                    <li key={index}>"{query}"</li>
                ))}
                </ul>
            </div>
        </div>
    </Accordion>
  );
};