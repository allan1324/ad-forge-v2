
export enum AppStep {
  Input,
  AdKit,
}

export interface ExtractedData {
  title: string;
  description: string;
  price: string;
  beds: number | string;
  baths: number | string;
  area: string;
  propertyType: string;
  location: string;
  amenities: string[];
  agentName: string;
}

export interface Insights {
  neighborhoodSummary: string;
  pricePosition: string;
  priceRationale: string;
  stockSearchQueries: string[];
}

export interface InvestorMetrics {
  grossYield: string;
  netYield: string;
  capRate: string;
  cashOnCash: string;
  assumptions: string;
}

export interface StagingPreset {
  style: string;
  prompt: string;
  altText: string;
}

export interface PersonaVariant {
  persona: string;
  hook: string;
  primaryText: string;
  headline: string;
  cta: string;
  hashtags: string[];
}

export interface VideoBeat {
  timestamp: string;
  visual: string;
  vo: string;
  overlayText: string;
}

export interface VideoPlan {
  storyboard: VideoBeat[];
  soraHandoff: {
    clips: {
        duration: number;
        prompt: string;
        vo: string;
        subtitles: string;
    }[];
    aspectRatio: string;
  };
}

export interface PlatformContent {
  platform: string;
  copy: string;
  charLimit: number | string;
}

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface ImageGenPrompt {
  useCase: string;
  prompt: string;
  altText: string;
}

export interface AdKitData {
  extractedData: ExtractedData;
  insights: Insights;
  investorMetrics: InvestorMetrics;
  stagingPresets: StagingPreset[];
  personaVariants: PersonaVariant[];
  videoPlan: VideoPlan;
  platformPacks: PlatformContent[];
  seo: SeoData;
  imageGenPrompts: ImageGenPrompt[];
  questionsToConfirm: string[];
}
