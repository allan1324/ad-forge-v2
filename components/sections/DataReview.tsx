import React from 'react';
import { ExtractedData } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';
import { CopyButton } from '../ui/CopyButton';

interface DataReviewProps {
  data: ExtractedData;
}

export const DataReview: React.FC<DataReviewProps> = ({ data }) => {
    const InfoItem = ({ label, value }: { label: string; value: string | number | undefined }) => {
        const stringValue = String(value || '').trim();
        const canCopy = stringValue && stringValue !== 'TBD';

        return (
            <div className="af-bg-surface af-p-3 af-rounded-lg af-border af-border-line">
                <div className="af-flex af-justify-between af-items-start">
                  <p className="af-text-sm af-text-text-lo">{label}</p>
                   {canCopy && <CopyButton textToCopy={stringValue} className="-af-mr-2 -af-mt-2" />}
                </div>
                <p className="af-font-semibold af-text-lg af-text-text-hi af-pr-4">{value || 'TBD'}</p>
            </div>
        );
    };

    return (
        <Accordion title="Extracted Property Data" icon={<Icons.clipboard />} defaultOpen={true} id="data">
            <div className="af-space-y-4">
                <div className="af-group">
                    <div className="af-flex af-justify-between af-items-start af-gap-2">
                        <h3 className="af-text-2xl af-font-bold af-font-display af-text-accent">{data.title}</h3>
                        <CopyButton textToCopy={data.title} className="af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                    </div>
                </div>
                <div className="af-group">
                    <div className="af-flex af-justify-between af-items-start af-gap-2">
                        <p className="af-text-text-lo af-max-w-prose">{data.description}</p>
                        <CopyButton textToCopy={data.description} className="af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                    </div>
                </div>
                
                <div className="af-grid af-grid-cols-2 md:af-grid-cols-3 lg:af-grid-cols-4 af-gap-4 af-pt-4">
                    <InfoItem label="Price" value={data.price} />
                    <InfoItem label="Property Type" value={data.propertyType} />
                    <InfoItem label="Bedrooms" value={data.beds} />
                    <InfoItem label="Bathrooms" value={data.baths} />
                    <InfoItem label="Area" value={data.area} />
                    <InfoItem label="Location" value={data.location} />
                </div>
                
                {data.amenities && data.amenities.length > 0 && (
                     <div className="af-group">
                        <div className="af-flex af-justify-between af-items-start">
                            <h4 className="af-font-semibold af-text-text-hi af-mt-6 af-mb-2 af-font-display">Key Amenities</h4>
                            <CopyButton textToCopy={data.amenities.join(', ')} className="af-mt-4 af-opacity-0 group-hover:af-opacity-100 af-transition-opacity" />
                        </div>
                        <div className="af-flex af-flex-wrap af-gap-2">
                        {data.amenities.map((amenity, index) => (
                            <span key={index} className="af-bg-badge af-text-accent af-text-sm af-font-medium af-px-3 af-py-1 af-rounded-full">
                            {amenity}
                            </span>
                        ))}
                        </div>
                    </div>
                )}
            </div>
        </Accordion>
    );
};