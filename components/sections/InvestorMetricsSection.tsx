import React from 'react';
import { InvestorMetrics } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';

interface InvestorMetricsSectionProps {
  data: InvestorMetrics;
}

export const InvestorMetricsSection: React.FC<InvestorMetricsSectionProps> = ({ data }) => {
  const Metric = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-slate-800/50 p-4 rounded-lg text-center">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-indigo-400">{value}</p>
    </div>
  );

  return (
    <Accordion title="Investor Metrics" icon={<Icons.calculator />}>
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Metric label="Gross Yield" value={data.grossYield} />
                <Metric label="Net Yield" value={data.netYield} />
                <Metric label="Cap Rate" value={data.capRate} />
                <Metric label="Cash-on-Cash" value={data.cashOnCash} />
            </div>
            <div>
                <h5 className="font-semibold text-slate-200 mt-4 mb-2 font-display">Assumptions</h5>
                <p className="text-sm text-slate-400 italic p-3 bg-slate-900/50 rounded-md">{data.assumptions}</p>
            </div>
        </div>
    </Accordion>
  );
};