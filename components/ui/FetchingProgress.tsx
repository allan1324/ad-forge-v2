import React from 'react';

interface FetchingProgressProps {
  progress: number; // 0 to 1
  statusText: string;
}

export const FetchingProgress: React.FC<FetchingProgressProps> = ({ progress, statusText }) => {
  const percentage = Math.round(progress * 100);

  return (
    <div className="space-y-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg animate-pulse once">
      <p className="text-sm text-center text-slate-300">{statusText || 'Initiating fetch...'}</p>
      <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};