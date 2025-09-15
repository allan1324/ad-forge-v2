import React from 'react';

export const ApiKeyBanner: React.FC = () => {
  return (
    <div className="af-bg-yellow-900/50 af-border af-border-yellow-700/80 af-text-yellow-200 af-px-4 af-py-3 af-rounded-lg af-relative af-mb-6" role="alert">
      <strong className="af-font-bold">For Developers: </strong>
      <span className="af-block sm:af-inline">
        Gemini API Key is not configured in your build environment.
      </span>
    </div>
  );
};