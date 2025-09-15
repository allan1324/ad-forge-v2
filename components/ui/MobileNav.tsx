import React, { useState } from 'react';
import { Icons } from './Icons';
import { Button } from './Button';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface NavItem {
  id: string;
  title: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  activeSection: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ navItems, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        aria-hidden="true"
        className={cn(
          'af-fixed af-inset-0 af-bg-ink/60 af-backdrop-blur-sm af-z-40 af-transition-opacity',
          isOpen ? 'af-opacity-100' : 'af-opacity-0 af-pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="af-fixed af-bottom-0 af-left-0 af-right-0 af-p-4 af-z-50" role="navigation" aria-label="Sections">
        <div className={cn(
            'af-absolute af-bottom-full af-left-4 af-right-4 af-mb-2 af-bg-panel af-border af-border-line af-rounded-lg af-shadow-soft af-overflow-hidden af-transition-all af-duration-300 af-ease-custom-ease',
            isOpen ? 'af-max-h-96 af-opacity-100' : 'af-max-h-0 af-opacity-0'
        )}>
            <div className="af-p-2 af-max-h-80 af-overflow-y-auto">
                <ul className="af-space-y-1">
                    {navItems.map(item => (
                    <li key={item.id}>
                        <a 
                            href={`#${item.id}`} 
                            onClick={handleLinkClick}
                            className={cn(
                                'af-block af-transition-colors af-rounded-md af-px-3 af-py-2 af-text-base af-font-medium',
                                activeSection === item.id
                                ? 'af-text-accent af-bg-accent/10'
                                : 'af-text-text-lo hover:af-text-text-hi hover:af-bg-surface'
                            )}
                        >
                        {item.title}
                        </a>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        
        <Button size="lg" className="af-w-full af-shadow-2xl" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-nav-menu">
          <Icons.menu className="af-h-5 af-w-5 af-mr-2"/>
          {isOpen ? 'Close Sections' : 'View Sections'}
        </Button>
      </div>
    </>
  );
};
