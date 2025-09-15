import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="af-bg-ink/80 af-backdrop-blur-lg af-border-b af-border-line af-sticky af-top-0 af-z-40">
      <div className="af-max-w-7xl af-mx-auto af-px-4 sm:af-px-6 lg:af-px-8 af-py-3">
        <div className="af-flex af-items-center af-gap-4">
          <div className="af-p-2 af-bg-accent af-rounded-lg af-shadow-soft">
            <svg xmlns="http://www.w3.org/2000/svg" className="af-h-7 af-w-7 af-text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
              <h1 className="af-text-2xl af-font-bold af-text-text-hi af-font-display">AdForge RE</h1>
              <p className="af-text-sm af-text-text-lo">AI-Powered Real-Estate Ad Engine</p>
          </div>
        </div>
      </div>
    </header>
  );
};