import React from 'react';
import { InvestorMetrics } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { Tooltip } from '../ui/Tooltip';
import { CopyButton } from '../ui/CopyButton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface InvestorMetricsSectionProps {
  data: InvestorMetrics;
}

// Custom Tooltip for Recharts, styled with Tailwind for a consistent look
const CustomRechartsTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="af-bg-panel af-p-3 af-border af-border-line af-rounded-lg af-shadow-soft">
        <p className="af-font-bold af-text-text-hi">{label}</p>
        {/* Use the original string label for precise value display */}
        <p className="af-text-accent">{`Value: ${payload[0].payload.label}`}</p>
      </div>
    );
  }
  return null;
};


export const InvestorMetricsSection: React.FC<InvestorMetricsSectionProps> = ({ data }) => {
  const Metric = ({ label, value }: { label: string; value: string }) => (
    <div className="af-bg-surface af-border af-border-line af-p-4 af-rounded-lg">
        <div className="af-flex af-justify-between af-items-start">
            <p className="af-text-sm af-text-text-lo">{label}</p>
            <CopyButton textToCopy={value} className="-af-mr-2 -af-mt-2"/>
        </div>
        <p className="af-text-2xl af-font-bold af-text-accent af-pr-4">{value}</p>
    </div>
  );

  // Helper function to parse metric strings (e.g., "7.5%") into numbers for charting
  const parseMetric = (metricString: string): number => {
    if (!metricString) return 0;
    const cleanedString = metricString.replace(/[^0-9.-]+/g, "");
    return parseFloat(cleanedString) || 0;
  };

  const chartData = [
    { name: 'Gross Yield', value: parseMetric(data.grossYield), label: data.grossYield },
    { name: 'Net Yield', value: parseMetric(data.netYield), label: data.netYield },
    { name: 'Cap Rate', value: parseMetric(data.capRate), label: data.capRate },
    { name: 'Cash-on-Cash', value: parseMetric(data.cashOnCash), label: data.cashOnCash },
  ].filter(item => item.value > 0); // Only include valid, positive metrics in the chart

  return (
    <Accordion 
        id="metrics"
        title={
            <div className="af-flex af-items-center af-gap-2">
                <span>Investor Metrics</span>
                <Tooltip content="Key financial ratios used to evaluate the profitability and potential return of this property as an investment.">
                    <Icons.info className="af-h-4 af-w-4 af-text-text-lo af-cursor-help" />
                </Tooltip>
            </div>
        }
        icon={<Icons.calculator />}
    >
        <div className="af-space-y-6">
            <div className="af-grid af-grid-cols-2 af-gap-4">
                <Metric label="Gross Yield" value={data.grossYield} />
                <Metric label="Net Yield" value={data.netYield} />
                <Metric label="Cap Rate" value={data.capRate} />
                <Metric label="Cash-on-Cash" value={data.cashOnCash} />
            </div>

            {chartData.length > 0 && (
              <div>
                <h5 className="af-font-semibold af-text-text-hi af-mb-3 af-font-display">Visual Comparison</h5>
                <div className="af-h-72 af-w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                      aria-label="Investor metrics chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#9FB2BF" />
                      <XAxis dataKey="name" stroke="#9FB2BF" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#9FB2BF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                      <RechartsTooltip content={<CustomRechartsTooltip />} cursor={{ fill: '#0E141B', fillOpacity: 0.6 }} />
                      <Bar dataKey="value" fill="#00E5C3" radius={[4, 4, 0, 0]} name="Metric Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="af-group">
                <div className="af-flex af-justify-between af-items-start">
                    <h5 className="af-font-semibold af-text-text-hi af-mt-4 af-mb-2 af-font-display">Assumptions</h5>
                    <CopyButton textToCopy={data.assumptions} className="af-mt-2 af-opacity-0 group-hover:af-opacity-100 af-transition-opacity"/>
                </div>
                <p className="af-text-sm af-text-text-lo af-italic af-p-3 af-bg-surface af-border af-border-line af-rounded-md">{data.assumptions}</p>
            </div>
        </div>
    </Accordion>
  );
};