import React from 'react';
import { Skeleton } from './Skeleton';
import { Icons } from './ui/Icons';
import { Card, CardContent, CardHeader } from './ui/Card';

// This is a skeleton that mimics the structure of an Accordion section.
const SkeletonAccordion: React.FC = () => (
    <Card>
        <CardHeader>
            <Skeleton.Line className="af-h-8 af-w-1/3" />
        </CardHeader>
        <CardContent>
            <div className="af-space-y-3">
                <Skeleton.Line className="af-h-4 af-w-full" />
                <Skeleton.Line className="af-h-4 af-w-5/6" />
                <div className="af-grid af-grid-cols-2 af-gap-4 af-pt-4">
                  <Skeleton.Line className="af-h-16 af-w-full" />
                  <Skeleton.Line className="af-h-16 af-w-full" />
                </div>
            </div>
        </CardContent>
    </Card>
);

export const AdKitDisplaySkeleton: React.FC = () => {
  return (
    <div className="af-animate-fade-in">
      {/* Header (No shimmer here, it's just static blocks) */}
      <header className="af-flex af-flex-col sm:af-flex-row af-justify-between af-items-start sm:af-items-center af-gap-4 af-mb-8">
        <Skeleton.Block className="af-h-12 af-w-96 af-rounded-md" />
        <Skeleton.Block className="af-h-10 af-w-32 af-rounded-button" />
      </header>
      
      {/* Progress Indicator (No shimmer here) */}
      <div className="af-mb-8 af-p-6 af-bg-panel af-border af-border-line af-rounded-lg af-flex af-items-center af-gap-4">
        <Icons.spinner className="af-animate-spin af-h-8 af-w-8 af-text-accent af-flex-shrink-0" />
        <div>
            <h2 className="af-text-xl af-font-bold af-text-text-hi">Generating Your Ad Kit...</h2>
            <p className="af-text-text-lo">This may take a moment. The AI is analyzing the property and crafting your marketing materials.</p>
        </div>
      </div>

      {/* Main content with shimmer effect */}
      <div className="af-relative af-overflow-hidden">
        <div className="af-grid af-grid-cols-1 lg:af-grid-cols-4 af-gap-8 af-items-start af-mt-8">
            <main className="lg:af-col-span-3 af-space-y-6">
              <SkeletonAccordion />
              <SkeletonAccordion />
              <SkeletonAccordion />
            </main>
            
            <aside className="af-hidden lg:af-block af-space-y-6 lg:af-sticky af-top-24">
                <Card className="af-p-4">
                    <Skeleton.Line className="af-h-6 af-w-1/2 af-mb-4" />
                    <div className="af-grid af-grid-cols-2 af-gap-3">
                        <Skeleton.Line className="af-h-9 af-w-full af-rounded-button" />
                        <Skeleton.Line className="af-h-9 af-w-full af-rounded-button" />
                    </div>
                </Card>
                <Card className="af-p-4">
                    <Skeleton.Line className="af-h-5 af-w-1/3 af-mb-4" />
                    <div className="af-space-y-2">
                        <Skeleton.Line className="af-h-8 af-w-full" />
                        <Skeleton.Line className="af-h-8 af-w-full" />
                        <Skeleton.Line className="af-h-8 af-w-full" />
                        <Skeleton.Line className="af-h-8 af-w-full" />
                        <Skeleton.Line className="af-h-8 af-w-full" />
                    </div>
                </Card>
            </aside>
        </div>
        {/* The shimmer element */}
        <div className="af-absolute af-inset-0 af-transform af-translate-x-[-100%] af-animate-shimmer af-bg-gradient-to-r af-from-transparent af-via-surface/50 af-to-transparent" />
      </div>
    </div>
  );
};
