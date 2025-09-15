import React from 'react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Tooltip } from './Tooltip';
import { Icons } from './Icons';

interface CopyButtonProps {
    textToCopy: string;
    className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className }) => {
    const [isCopied, copy] = useCopyToClipboard();

    return (
        <Tooltip content={isCopied ? 'Copied!' : 'Copy'}>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    copy(textToCopy);
                }}
                className={`af-p-2 af-rounded-full af-text-text-lo hover:af-bg-surface hover:af-text-text-hi af-transition-colors disabled:af-opacity-50 ${className}`}
                aria-label="Copy to clipboard"
            >
                {isCopied ? (
                    <Icons.check className="af-h-4 af-w-4 af-text-accent" />
                ) : (
                    <Icons.copy className="af-h-4 af-w-4" />
                )}
            </button>
        </Tooltip>
    );
};