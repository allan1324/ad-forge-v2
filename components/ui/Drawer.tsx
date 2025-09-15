import React, { useEffect, useState, ReactNode } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = '';
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
    
    return () => {
        document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isRendered) {
    return null;
  }

  return (
    <div 
        className="af-fixed af-inset-0 af-z-50" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="drawer-title"
    >
      {/* Overlay */}
      <div
        className={cn(
            'af-fixed af-inset-0 af-bg-ink/60 af-backdrop-blur-sm af-transition-opacity af-duration-300',
            isOpen ? 'af-opacity-100' : 'af-opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Content */}
      <div className={cn(
          'af-fixed af-bottom-0 af-left-0 af-right-0 af-z-50 af-bg-panel af-border-t af-border-line af-rounded-t-card af-shadow-2xl af-transform af-transition-transform af-duration-300 af-ease-custom-ease',
          isOpen ? 'af-translate-y-0' : 'af-translate-y-full'
      )}>
        <div className="af-flex af-items-center af-justify-between af-p-4 af-border-b af-border-line">
          <h2 id="drawer-title" className="af-text-lg af-font-semibold af-text-text-hi">{title}</h2>
          <button 
            onClick={onClose} 
            className="af-p-2 af-rounded-full af-text-text-lo hover:af-bg-surface hover:af-text-text-hi af-transition"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="af-h-6 af-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="af-max-h-[75vh] af-overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};