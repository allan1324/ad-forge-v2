import React from 'react';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';

interface QuestionsSectionProps {
  questions: string[];
}

export const QuestionsSection: React.FC<QuestionsSectionProps> = ({ questions }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="af-bg-yellow-900/50 af-border af-border-yellow-700/80 af-text-yellow-200 af-p-6 af-rounded-lg">
      <div className="af-flex af-justify-between af-items-start">
        <h3 className="af-font-bold af-text-xl af-mb-3 af-flex af-items-center af-gap-2 af-font-display">
          <Icons.help />
          Questions to Confirm
        </h3>
        <CopyButton textToCopy={questions.join('\n')} className="af-text-yellow-200 hover:af-bg-yellow-400/20" />
      </div>
      <p className="af-text-sm af-text-yellow-300 af-mb-4">The AI identified some missing details. Please clarify these points for the most accurate ad kit:</p>
      <ul className="af-list-disc af-list-inside af-space-y-2">
        {questions.map((q, index) => (
          <li key={index} className="af-text-yellow-100">{q}</li>
        ))}
      </ul>
    </div>
  );
};