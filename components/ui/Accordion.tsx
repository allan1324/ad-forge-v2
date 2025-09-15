import React, { useState, ReactNode } from 'react';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  icon: ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, icon, defaultOpen = false, id }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={id} className="af-border af-border-line af-bg-panel af-rounded-lg af-shadow-soft">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="af-w-full af-flex af-justify-between af-items-center af-p-4 hover:af-bg-white/5 af-transition af-duration-200"
        aria-expanded={isOpen}
      >
        <div className="af-flex af-items-center af-gap-3">
            <span className="af-text-accent">{icon}</span>
            <span className="af-font-bold af-text-lg af-text-left af-text-text-hi af-font-display af-tracking-wide">{title}</span>
        </div>
        <svg
          className={`af-w-6 af-h-6 af-transform af-transition-transform af-duration-300 af-text-text-lo ${isOpen ? 'af-rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`af-grid af-transition-all af-duration-500 af-ease-in-out ${
          isOpen ? 'af-grid-rows-[1fr] af-opacity-100' : 'af-grid-rows-[0fr] af-opacity-0'
        }`}
      >
        <div className="af-overflow-hidden">
          <div className="af-p-4 md:af-p-6 af-border-t af-border-line">{children}</div>
        </div>
      </div>
    </div>
  );
};