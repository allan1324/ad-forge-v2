import React from 'react';
import { Icons } from '../ui/Icons';

interface QuestionsSectionProps {
  questions: string[];
}

export const QuestionsSection: React.FC<QuestionsSectionProps> = ({ questions }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-200 p-6 rounded-lg">
      <h3 className="font-bold text-xl mb-3 flex items-center gap-2 font-display">
        <Icons.help />
        Questions to Confirm
      </h3>
      <p className="text-sm text-yellow-300 mb-4">The AI identified some missing details. Please clarify these points for the most accurate ad kit:</p>
      <ul className="list-disc list-inside space-y-2">
        {questions.map((q, index) => (
          <li key={index} className="text-yellow-100">{q}</li>
        ))}
      </ul>
    </div>
  );
};