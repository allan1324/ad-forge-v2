import React from 'react';
import { Insights } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';

interface InsightsSectionProps {
  data: Insights;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ data }) => {
  return (
    <Accordion title="Market Insights" icon={<Icons.lightbulb />}>
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-lg font-display text-indigo-400 mb-2">Neighborhood Summary</h4>
                <p className="text-slate-300">{data.neighborhoodSummary}</p>
            </div>
            <div>
                <h4 className="font-semibold text-lg font-display text-indigo-400 mb-2">Price Position Analysis</h4>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                    <p className="font-bold text-xl text-white">{data.pricePosition}</p>
                    <p className="text-slate-400">{data.priceRationale}</p>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-lg font-display text-indigo-400 mb-2">Suggested Stock Search Queries</h4>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                {data.stockSearchQueries.map((query, index) => (
                    <li key={index}>"{query}"</li>
                ))}
                </ul>
            </div>
        </div>
    </Accordion>
  );
};