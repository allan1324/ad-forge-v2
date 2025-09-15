import React from 'react';
import { Card, CardContent, CardHeader } from './ui/Card';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const Shimmer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="af-relative af-overflow-hidden af-bg-panel af-rounded-md">
        {children}
        <div className="af-absolute af-inset-0 af-transform af-translate-x-[-100%] af-animate-shimmer af-bg-gradient-to-r af-from-transparent af-via-surface/50 af-to-transparent" />
    </div>
);

const Block: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('af-h-full af-w-full af-bg-surface', className)} />
);

const Line: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('af-h-4 af-rounded-sm af-bg-surface', className)} />
);

const Preview: React.FC = () => (
    <Shimmer>
        <div className="af-space-y-4 af-p-1">
            <div className="af-grid af-grid-cols-5 af-gap-3 af-h-24">
                <Block className="af-rounded-md" />
                <Block className="af-rounded-md" />
                <Block className="af-rounded-md" />
                <Block className="af-rounded-md" />
                <Block className="af-rounded-md" />
            </div>
            <div className="af-space-y-2 af-p-2">
                <Line className="af-w-full" />
                <Line className="af-w-5/6" />
                <Line className="af-w-3/4" />
            </div>
        </div>
    </Shimmer>
);

const SkeletonCard: React.FC = () => (
    <Card>
        <CardHeader>
            <Shimmer><Line className="af-h-6 af-w-1/3" /></Shimmer>
        </CardHeader>
        <CardContent>
            <Shimmer>
                <div className="af-space-y-3 af-p-1">
                    <Line className="af-w-full" />
                    <Line className="af-w-5/6" />
                    <Line className="af-w-3/4" />
                </div>
            </Shimmer>
        </CardContent>
    </Card>
);

export const Skeleton = { Block, Line, Preview, Card: SkeletonCard };
