
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

// --- NEW Video Types ---
export interface SoraSettings {
    duration_seconds: number;
    ar: string;
    fps: number;
    motion: string;
    camera: string;
    lighting: string;
    negatives: string[];
}

export interface SoraClipPrompt {
    id: number;
    prompt: string;
    continuity_tags: string[];
    on_screen_text: string;
    sfx_suggestion: string;
    transition_to_next: string;
    sora_settings?: SoraSettings;
    alt_variations: string[];
}
// --- END NEW Video Types ---

export interface AdKitData {
  extractedData: ExtractedData;
  insights: Insights;
  investorMetrics: InvestorMetrics;
  stagingPresets: StagingPreset[];
  personaVariants: PersonaVariant[];
  Short_Form_Video: {
      Clip_Prompts_6x5s: SoraClipPrompt[];
  };
  Voiceover: {
      "30s_VO": string;
  };
  platformPacks: PlatformContent[];
  seo: SeoData;
  imageGenPrompts: ImageGenPrompt[];
  questionsToConfirm: string[];
}
