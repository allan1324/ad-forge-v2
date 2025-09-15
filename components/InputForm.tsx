import React, { useState } from 'react';

interface InputFormProps {
  onGenerate: (market: string, currency: string) => void;
  disabled: boolean;
  onUrlFetch: (url: string) => void;
  isFetchingUrl: boolean;
  propertyDescription: string;
  setPropertyDescription: (value: string) => void;
  propertyImageUrls: string[];
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, disabled, onUrlFetch, isFetchingUrl, propertyDescription, setPropertyDescription, propertyImageUrls }) => {
  const [url, setUrl] = useState<string>('');
  const [market, setMarket] = useState<string>('Nigeria');
  const [currency, setCurrency] = useState<string>('NGN (₦)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (propertyDescription.trim() && !disabled) {
      onGenerate(market, currency);
    }
  };
  
  const handleFetchClick = () => {
    if (url.trim() && !isFetchingUrl) {
        onUrlFetch(url);
    }
  }

  const sampleDescription = `For Sale: A stunning 4-bedroom terrace duplex in the heart of Lekki Phase 1, Lagos. This property features all rooms en-suite, a fully fitted kitchen with modern appliances, a spacious living area, and a dedicated parking space for 2 cars. The estate is secure with 24/7 power and security. Asking price is 150 million Naira. Close to Nike Art Gallery and key commercial hubs.`;


  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-white">Generate Your Ad Kit in Seconds</h2>
        <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">Start by providing a property URL to automatically fetch details, or paste the description manually.</p>
      </div>
      
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <legend className="sr-only">Configuration</legend>
            <div>
              <label htmlFor="market" className="block text-sm font-medium text-slate-300 mb-2">Target Market</label>
              <input
                id="market"
                type="text"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full bg-slate-800/60 border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
              <input
                id="currency"
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-800/60 border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>
          </fieldset>
          
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
            <label htmlFor="url" className="block text-base font-semibold text-white">
                Step 1: Fetch from URL <span className="text-sm font-normal text-slate-400">(Recommended)</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <input 
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-property-site.com/listing/123"
                className="w-full bg-slate-700/80 border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition disabled:opacity-50"
                disabled={isFetchingUrl}
              />
              <button
                type="button"
                onClick={handleFetchClick}
                disabled={!url.trim() || isFetchingUrl || disabled}
                className="flex-shrink-0 w-full sm:w-auto bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isFetchingUrl ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Fetching...
                  </>
                ) : "Fetch Content"}
              </button>
            </div>
          </div>
          
          {propertyImageUrls.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Fetched Images</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {propertyImageUrls.map((imgUrl, index) => (
                  <a href={imgUrl} target="_blank" rel="noopener noreferrer" key={index} className="block aspect-square bg-slate-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                    <img
                      src={imgUrl}
                      alt={`Fetched property image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.img-error')) {
                           const errorDiv = document.createElement('div');
                           errorDiv.className = 'img-error w-full h-full flex items-center justify-center text-slate-500 text-xs text-center p-1';
                           errorDiv.innerText = 'Image failed';
                           parent.appendChild(errorDiv);
                        }
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="relative flex pt-2 items-center">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="flex-shrink mx-4 text-slate-500 text-sm">OR</span>
              <div className="flex-grow border-t border-slate-700"></div>
          </div>

          <div>
            <label htmlFor="description" className="block text-base font-semibold text-white mb-3">Step 2: Provide Description Manually</label>
            <textarea
              id="description"
              rows={12}
              value={propertyDescription}
              onChange={(e) => setPropertyDescription(e.target.value)}
              className="w-full bg-slate-800/60 border-slate-700 text-white rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition placeholder:text-slate-500"
              placeholder="If the URL fetch doesn't work, or for more control, paste the property details here."
            />
             <div className="text-right mt-2">
                 <button
                    type="button"
                    onClick={() => setPropertyDescription(sampleDescription)}
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                >
                    Use Sample Description
                </button>
             </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={!propertyDescription.trim() || disabled || isFetchingUrl}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-lg text-lg transition duration-300 ease-in-out disabled:bg-slate-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              Generate Ad Kit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;