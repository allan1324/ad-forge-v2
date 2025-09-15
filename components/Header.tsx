import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center gap-4">
        <div className="p-2 bg-indigo-600 rounded-lg shadow-indigo-500/30 shadow-[0_0_15px]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
            <h1 className="text-2xl font-bold text-white font-display">AdForge RE</h1>
            <p className="text-sm text-slate-400">AI-Powered Real-Estate Ad Engine</p>
        </div>
      </div>
    </header>
  );
};