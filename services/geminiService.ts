
import { GoogleGenAI, Type } from "@google/genai";
import type { SlideDeck } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const slideSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A short, catchy, and fun title for the slide. Should be 2-5 words."
    },
    content: {
      type: Type.ARRAY,
      description: "A list of 2-4 short, easy-to-read bullet points. Use emojis to make it visually appealing and fun for 13-year-olds.",
      items: { type: Type.STRING }
    },
    speakerNote: {
      type: Type.STRING,
      description: "A simple, friendly tip for the 13-year-old speaker on how to present this slide. e.g., 'Ask the audience a question here' or 'Make this part sound exciting!'"
    }
  },
  required: ["title", "content", "speakerNote"]
};

const slideDeckSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A compelling, catchy title for the entire presentation that would appeal to teenagers."
    },
    slides: {
      type: Type.ARRAY,
      description: "An array of 8-10 slides that make up the presentation.",
      items: slideSchema
    }
  },
  required: ["title", "slides"]
};


export const generatePresentationSlides = async (): Promise<SlideDeck> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: "Generate a fun, easy-to-read slide presentation for a 5-minute TED-style talk about the good and bad sides of social media for teenagers. The speaker is 13, and the audience is their classmates. The output should be structured as a series of slides. Start with a slide that has a super catchy, surprising, or funny opening hook. End with a slide that has a powerful, simple, and memorable closing statement. Keep the language simple, direct, and use emojis.",
      config: {
        systemInstruction: "You are an expert presentation designer who is amazing at creating slide decks for teenagers. You're crafting a 5-minute TED-style talk for a 13-year-old to give to their classmates. The tone must be super relatable, a bit like a popular YouTuber or a cool older sibling. Use simple language, short bullet points, and fun emojis. The goal is to be authentic, visually engaging, and thought-provoking, not preachy.",
        responseMimeType: "application/json",
        responseSchema: slideDeckSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    if (
      !parsedData.title ||
      !Array.isArray(parsedData.slides)
    ) {
      throw new Error("Generated content is missing required fields.");
    }

    return parsedData as SlideDeck;
  } catch (error) {
    console.error("Error generating presentation slides:", error);
    throw new Error("Failed to generate presentation from the API. Please check the console for more details.");
  }
};
