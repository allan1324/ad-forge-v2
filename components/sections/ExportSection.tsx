import React from 'react';
import { AdKitData } from '../../types';
import { Icons } from '../ui/Icons';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

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
    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
        <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2 font-display">
            <Icons.download />
            Export Options
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <button
                onClick={() => copy(fullText)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition text-sm"
            >
                {isCopied ? 'Copied!' : 'Copy All as Text'}
            </button>
            <button
                onClick={downloadJson}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition text-sm"
            >
                Download JSON
            </button>
        </div>
    </div>
  );
};