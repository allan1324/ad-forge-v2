
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
        beds: { type: Type.INTEGER, description: "Number of bedrooms. Use 'TBD' string if not found." },
        baths: { type: Type.INTEGER, description: "Number of bathrooms. Use 'TBD' string if not found." },
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
    videoPlan: {
      type: Type.OBJECT,
      properties: {
        storyboard: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timestamp: { type: Type.STRING },
              visual: { type: Type.STRING },
              vo: { type: Type.STRING },
              overlayText: { type: Type.STRING },
            },
          },
        },
        soraHandoff: {
          type: Type.OBJECT,
          properties: {
            clips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  duration: { type: Type.NUMBER },
                  prompt: { type: Type.STRING },
                  vo: { type: Type.STRING },
                  subtitles: { type: Type.STRING },
                },
              },
            },
            aspectRatio: { type: Type.STRING, description: "e.g., '9:16' for vertical video" },
          },
        },
      },
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
    Your task is to analyze the following property description and generate a complete ad kit.

    **Market Context:**
    - Primary Market: ${market}
    - Currency: ${currency}
    - Language Style: English, concise, benefits-first.

    **Core Rules:**
    1.  **NEVER** hallucinate prices, specs, or legal claims.
    2.  If any piece of information is missing or ambiguous from the provided text, use the string "TBD" for that field.
    3.  For every "TBD" field, add a clear, actionable question to the 'questionsToConfirm' list for the user to clarify.
    4.  All generated content must be tailored to the specified market and currency.
    5.  Investor metrics should be based on conservative, realistic estimates for the specified market. Clearly state your assumptions.

    **Property Description to Analyze:**
    ---
    ${propertyDescription}
    ---

    Now, generate the complete ad kit based on the schema provided.
  `;
};

export const generateAdKit = async (propertyDescription: string, market: string, currency: string): Promise<AdKitData> => {
  if (!process.env.API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  const model = 'gemini-2.5-flash';
  const prompt = createMasterPrompt(propertyDescription, market, currency);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: adKitSchema,
      }
    });

    const jsonString = response.text.trim();
    
    // Sometimes the model might wrap the JSON in markdown backticks, so we clean it.
    const cleanedJsonString = jsonString.replace(/^```json\s*|```$/g, '');
    
    const parsedData = JSON.parse(cleanedJsonString);
    return parsedData as AdKitData;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The AI model failed to generate a valid response. Please check the property description and try again.");
  }
};
