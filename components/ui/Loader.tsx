import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Analyzing property data...",
  "Crafting compelling narratives...",
  "Checking market trends...",
  "Generating investor metrics...",
  "Designing social media packs...",
  "Finalizing your ad kit..."
];

const Loader: React.FC = () => {
  const [message, setMessage] = useState(MESSAGES[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = MESSAGES.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % MESSAGES.length;
        return MESSAGES[nextIndex];
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="af-fixed af-inset-0 af-bg-ink/80 af-backdrop-blur-md af-flex af-flex-col af-items-center af-justify-center af-z-50 af-animate-fade-in-overlay">
      <div className="af-relative af-h-24 af-w-24">
         <div className="af-absolute af-inset-0 af-rounded-full af-border-4 af-border-surface af-opacity-50"></div>
        <div className="af-animate-spin af-rounded-full af-h-full af-w-full af-border-t-4 af-border-b-4 af-border-accent"></div>
        <div className="af-absolute af-top-1/2 af-left-1/2 -af-translate-x-1/2 -af-translate-y-1/2 af-text-accent">
           <svg xmlns="http://www.w3.org/2000/svg" className="af-h-10 af-w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <p key={message} className="af-text-text-hi af-text-xl af-mt-8 af-font-display af-tracking-wide af-animate-fade-in">
        {message}
      </p>
    </div>
  );
};

export default Loader;