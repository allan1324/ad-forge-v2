import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <div className="af-text-center af-py-12 af-px-6 af-border-2 af-border-dashed af-border-line af-rounded-card">
      <div className="af-mx-auto af-h-12 af-w-12 af-flex af-items-center af-justify-center af-bg-surface af-rounded-full af-border af-border-line af-text-text-lo">
        {icon}
      </div>
      <h3 className="af-mt-4 af-text-lg af-font-semibold af-text-text-hi">{title}</h3>
      <p className="af-mt-1 af-text-sm af-text-text-lo">{description}</p>
      {action && <div className="af-mt-6">{action}</div>}
    </div>
  );
};
