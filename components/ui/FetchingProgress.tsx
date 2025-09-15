import React from 'react';

interface FetchingProgressProps {
  progress: number; // 0 to 1
  statusText: string;
}

export const FetchingProgress: React.FC<FetchingProgressProps> = ({ progress, statusText }) => {
  const percentage = Math.round(progress * 100);

  return (
    <div className="af-space-y-2 af-p-3 af-bg-surface af-border af-border-line af-rounded-lg">
      <p className="af-text-sm af-text-center af-text-text-lo">{statusText || 'Initiating fetch...'}</p>
      <div className="af-w-full af-bg-panel af-rounded-full af-h-2 af-overflow-hidden">
        <div 
          className="af-bg-accent af-h-2 af-rounded-full af-transition-all af-duration-500 af-ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
