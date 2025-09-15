import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode | string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs p-3 bg-slate-800 border border-slate-700 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-700"></div>
      </div>
    </div>
  );
};
