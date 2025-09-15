import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode | string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className="af-relative af-flex af-items-center af-group">
      {children}
      <div className="af-absolute af-bottom-full af-left-1/2 -af-translate-x-1/2 af-mb-2 af-w-max af-max-w-xs af-p-3 af-bg-slate-800 af-border af-border-slate-700 af-text-white af-text-sm af-rounded-lg af-shadow-lg af-opacity-0 group-hover:af-opacity-100 af-transition-opacity af-duration-300 af-pointer-events-none af-z-50">
        {content}
        <div className="af-absolute af-top-full af-left-1/2 -af-translate-x-1/2 af-w-0 af-h-0 af-border-x-4 af-border-x-transparent af-border-t-4 af-border-t-slate-700"></div>
      </div>
    </div>
  );
};