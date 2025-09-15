import { GoogleGenAI, Type } from "@google/genai";
import type { AdKitData } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const adKitSchema = {
  type: Type.OBJECT,
  properties: {
    extractedData: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        price: { type: Type.STRING },
        beds: { type: Type.STRING, description: "Number of bedrooms. Use 'TBD' string if not found." },
        baths: { type: Type.STRING, description: "Number of bathrooms. Use 'TBD' string if not found." },
        area: { type: Type.STRING, description: "e.g., '250 sqm'. Use 'TBD' if not found." },
        propertyType: { type: Type.STRING },
        location: { type: Type.STRING },
        amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
        agentName: { type: Type.STRING, description: "Use 'TBD' if not found." },
      },
    },
    insights: {
      type: Type.OBJECT,
      properties: {
        neighborhoodSummary: { type: Type.STRING },
        pricePosition: { type: Type.STRING, description: "'Below Market', 'In Range', or 'Above Market'" },
        priceRationale: { type: Type.STRING },
        stockSearchQueries: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    investorMetrics: {
      type: Type.OBJECT,
      properties: {
        grossYield: { type: Type.STRING },
        netYield: { type: Type.STRING },
        capRate: { type: Type.STRING },
        cashOnCash: { type: Type.STRING },
        assumptions: { type: Type.STRING, description: "A brief summary of assumptions made for calculation." },
      },
    },
    stagingPresets: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          style: { type: Type.STRING },
          prompt: { type: Type.STRING },
          altText: { type: Type.STRING },
        },
      },
    },
    personaVariants: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          persona: { type: Type.STRING },
          hook: { type: Type.STRING },
          primaryText: { type: Type.STRING },
          headline: { type: Type.STRING },
          cta: { type: Type.STRING },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
      },
    },
    Short_Form_Video: {
      type: Type.OBJECT,
      description: "A plan for a short-form video ad, including 6 clip prompts and a voiceover.",
      properties: {
        Clip_Prompts_6x5s: {
          type: Type.ARRAY,
          description: "An array of exactly 6 video clip prompts for a generator like Sora.",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER, description: "Clip sequence number (1-6)." },
              prompt: { type: Type.STRING, description: "Concise Sora-ready scene description." },
              continuity_tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tokens for visual consistency. CRUCIAL: Be highly specific and evocative. Derive from unique property features. AVOID generic terms like 'luxury', 'modern'. INSTEAD, use tangible details: materials (e.g., 'warm oak floors'), lighting (e.g., 'golden hour sunlight'), mood (e.g., 'serene garden view'). These define the video's aesthetic." },
              on_screen_text: { type: Type.STRING, description: "Short overlay text, max 6 words." },
              sfx_suggestion: { type: Type.STRING, description: "e.g., 'key click + soft whoosh'." },
              transition_to_next: { type: Type.STRING, description: "e.g., 'match cut on door close'." },
              sora_settings: {
                type: Type.OBJECT,
                description: "Optional, safe hints for the video generator.",
                properties: {
                  duration_seconds: { type: Type.NUMBER, description: "Should be 5." },
                  ar: { type: Type.STRING, description: "Aspect ratio, e.g., '9:16'." },
                  fps: { type: Type.NUMBER, description: "Frames per second, e.g., 24." },
                  motion: { type: Type.STRING, description: "e.g., 'slow push-in'." },
                  camera: { type: Type.STRING, description: "e.g., '35mm, waist-up'." },
                  lighting: { type: Type.STRING, description: "e.g., 'bright natural window light'." },
                  negatives: { type: Type.ARRAY, items: { type: Type.STRING }, description: "e.g., ['blurry', 'watermark']." },
                },
              },
              alt_variations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Two alternate prompts for retries." },
            },
          },
        },
      },
    },
    Voiceover: {
        type: Type.OBJECT,
        properties: {
            "30s_VO": { type: Type.STRING, description: "A single 30-second voiceover script, ~90 words, that aligns with the six clips." }
        }
    },
    platformPacks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          platform: { type: Type.STRING },
          copy: { type: Type.STRING },
          charLimit: { type: Type.STRING },
        },
      },
    },
    seo: {
      type: Type.OBJECT,
      properties: {
        metaTitle: { type: Type.STRING },
        metaDescription: { type: Type.STRING },
        keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    imageGenPrompts: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                useCase: { type: Type.STRING },
                prompt: { type: Type.STRING },
                altText: { type: Type.STRING },
            }
        }
    },
    questionsToConfirm: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
};

const createMasterPrompt = (propertyDescription: string, market: string, currency: string): string => {
  return `
    You are AdForge RE, a production-grade, real-estate product-marketing generator.
    Your task is to analyze the following property description and generate a complete ad kit as a single, valid JSON object that adheres strictly to the provided schema.

    RULES:
    1.  **Full Completion**: Populate every single field in the schema. Do not omit any part of the structure.
    2.  **No Placeholders**: Do not use placeholders like "TBD" or "N/A" unless explicitly permitted for a specific field in the schema description. If you cannot find information, infer it creatively and logically based on the context. For 'questionsToConfirm', list what you had to infer.
    3.  **Market & Currency Context**: All financial data, market analysis, and cultural references must be tailored to the specified Target Market ('${market}') and Currency ('${currency}').
    4.  **Creative & Compelling Copy**: The copy should be persuasive and professional, designed to attract buyers.
    5.  **Investor Metrics**: Calculations should be realistic estimates based on the property type and market. Clearly state your assumptions.
    6.  **Personas**: Generate three distinct, well-defined buyer personas relevant to the property and market.
    7.  **Video Plan**: The 6 Sora clip prompts must tell a cohesive, compelling visual story. Ensure the voiceover script perfectly syncs with the sequence of clips.
    8.  **Visually Rich Image Prompts**: For 'stagingPresets' and 'imageGenPrompts', create highly descriptive and artistic prompts. Specify details like:
        - **Lighting**: e.g., 'soft morning light streaming through windows', 'dramatic sunset glow', 'warm ambient interior lighting'.
        - **Camera Angle**: e.g., 'wide-angle view', 'eye-level shot', 'low-angle shot looking up'.
        - **Artistic Style**: e.g., 'photorealistic, cinematic style, shot on Portra 400 film', 'minimalist aesthetic', 'impressionistic'.
        - **Composition**: e.g., 'rule of thirds', 'leading lines from the hallway'.
        The goal is to generate varied, professional, and visually stunning images.

    PROPERTY DESCRIPTION:
    ---
    ${propertyDescription}
    ---
  `;
};

export const generateAdKit = async (propertyDescription: string, market: string, currency: string): Promise<AdKitData> => {
  try {
    const masterPrompt = createMasterPrompt(propertyDescription, market, currency);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: masterPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: adKitSchema,
            temperature: 0.8,
        }
    });

    const jsonText = response.text.trim();
    const adKit = JSON.parse(jsonText) as AdKitData;
    return adKit;

  } catch (error: any) {
    console.error("Error generating Ad Kit:", error);
    let errorMessage = "An unknown error occurred while generating the ad kit.";
    if (error.message) {
      errorMessage = error.message;
    }
    // Attempt to parse more detailed error from Google GenAI response
    if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error.message;
    }
    throw new Error(`Gemini API Error: ${errorMessage}`);
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }
  
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated by the API.");
    }

  } catch (error: any) {
    console.error("Error generating image:", error);
    throw new Error(`Gemini API Error for Image Generation: ${error.message || 'An unknown error occurred.'}`);
  }
};