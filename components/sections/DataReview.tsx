import React from 'react';
import { ExtractedData } from '../../types';
import { Accordion } from '../ui/Accordion';
import { Icons } from '../ui/Icons';

interface DataReviewProps {
  data: ExtractedData;
}

export const DataReview: React.FC<DataReviewProps> = ({ data }) => {
    const InfoItem = ({ label, value }: { label: string; value: string | number | undefined }) => (
        <div className="bg-slate-800/50 p-3 rounded-lg">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="font-semibold text-lg text-white">{value || 'TBD'}</p>
        </div>
    );

    return (
        <Accordion title="Extracted Property Data" icon={<Icons.clipboard />} defaultOpen={true}>
            <div className="space-y-4">
                <h3 className="text-2xl font-bold font-display text-indigo-400">{data.title}</h3>
                <p className="text-slate-300">{data.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                    <InfoItem label="Price" value={data.price} />
                    <InfoItem label="Property Type" value={data.propertyType} />
                    <InfoItem label="Bedrooms" value={data.beds} />
                    <InfoItem label="Bathrooms" value={data.baths} />
                    <InfoItem label="Area" value={data.area} />
                    <InfoItem label="Location" value={data.location} />
                </div>
                
                {data.amenities && data.amenities.length > 0 && (
                     <div>
                        <h4 className="font-semibold text-slate-200 mt-6 mb-2 font-display">Key Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                        {data.amenities.map((amenity, index) => (
                            <span key={index} className="bg-indigo-500/10 text-indigo-300 text-sm font-medium px-3 py-1 rounded-full">
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