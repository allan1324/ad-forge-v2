import React, { useState, ReactNode } from 'react';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  icon: ReactNode;
  defaultOpen?: boolean;
  // FIX: Added optional id prop to be used for anchors.
  id?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, icon, defaultOpen = false, id }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    // FIX: Apply the id to the root element.
    <div id={id} className="border border-slate-800 bg-slate-900/50 rounded-lg shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 hover:bg-slate-800/60 transition duration-200"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
            <span className="text-indigo-400">{icon}</span>
            <span className="font-bold text-lg text-left text-white font-display tracking-wide">{title}</span>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 md:p-6 border-t border-slate-800">{children}</div>
        </div>
      </div>
    </div>
  );
};