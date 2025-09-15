import React from 'react';
import { AdKitData } from '../../types';
import { Icons } from '../ui/Icons';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Button } from '../ui/Button';

interface ExportSectionProps {
  data: AdKitData;
}

export const ExportSection: React.FC<ExportSectionProps> = ({ data }) => {
    const [isCopied, copy] = useCopyToClipboard();

    const downloadJson = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "ad-kit.json";
        link.click();
    };
    
    const fullText = Object.entries(data)
    .map(([key, value]) => {
      let sectionContent = `## ${key.replace(/([A-Z])/g, ' $1').toUpperCase()}\n\n`;
      if (Array.isArray(value)) {
        sectionContent += value.map(item => JSON.stringify(item, null, 2)).join('\n\n');
      } else if (typeof value === 'object' && value !== null) {
        sectionContent += JSON.stringify(value, null, 2);
      } else {
        sectionContent += value;
      }
      return sectionContent;
    })
    .join('\n\n---\n\n');


  return (
    <div className="af-p-4 af-bg-panel af-rounded-lg af-border af-border-line">
        <h3 className="af-font-semibold af-text-lg af-text-text-hi af-mb-4 af-flex af-items-center af-gap-2 af-font-display">
            <Icons.download />
            Export Options
        </h3>
        <div className="af-grid af-grid-cols-1 sm:af-grid-cols-2 af-gap-3">
             <Button
                onClick={() => copy(fullText)}
                variant="secondary"
            >
                {isCopied ? 'Copied!' : 'Copy All as Text'}
            </Button>
            <Button
                onClick={downloadJson}
                variant="secondary"
            >
                Download JSON
            </Button>
        </div>
    </div>
  );
};