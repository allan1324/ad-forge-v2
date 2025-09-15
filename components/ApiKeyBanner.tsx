import React from 'react';

export const ApiKeyBanner: React.FC = () => {
  return (
    <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
      <strong className="font-bold">Action Required: </strong>
      <span className="block sm:inline">
        Gemini API Key is not set. Please create a `.env` file with `API_KEY=your_api_key` to use this application.
      </span>
    </div>
  );
};