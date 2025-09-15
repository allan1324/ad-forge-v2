import React from 'react';
import { Button } from './ui/Button';
import { Icons } from './ui/Icons';

interface TopBarProps {
  onGenerate: () => void;
  canGenerate: boolean;
  onBack: () => void;
  showBack: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onGenerate, canGenerate, onBack, showBack }) => {
  return (
    <div className="af-container !af-py-0">
      <div className="af-flex af-items-center af-justify-between af-h-16">
        <div className="af-flex af-items-center af-gap-3">
          <div className="af-p-2 af-bg-accent af-rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="af-h-6 af-w-6 af-text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="af-text-xl af-font-bold af-text-text-hi af-font-display">AdForge RE</h1>
        </div>
        <div className="af-flex af-items-center af-gap-4">
          {showBack ? (
            <Button variant="ghost" onClick={onBack}>
              &larr; Start Over
            </Button>
          ) : (
            <Button onClick={onGenerate} disabled={!canGenerate} size="lg">
              <Icons.lightbulb className="af-mr-2 af-h-5 af-w-5"/>
              Generate Ad Kit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};