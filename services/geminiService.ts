
import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const fetchHistoricalQuote = async (category?: string): Promise<Quote> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Jesteś "Silnikiem Historycznej Mądrości i Motywacji". Twoim zadaniem jest dostarczenie głębokiego, motywującego i bogatego kontekstowo cytatu od słynnej postaci historycznej (filozofa, naukowca, lidera, artysty).
  
  ${category ? `Skup się na kategorii: ${category}.` : "Wybierz dowolną ważną postać historyczną."}
  
  Zasady:
  1. Wybierz autentyczny lub bardzo reprezentatywny cytat.
  2. Język odpowiedzi: Polski.
  3. Ton: Inspirujący, wyrafinowany, ale przystępny.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          quote: {
            type: Type.STRING,
            description: "Tekst cytatu w języku polskim.",
          },
          author: {
            type: Type.STRING,
            description: "Imię i nazwisko postaci historycznej.",
          },
          era: {
            type: Type.STRING,
            description: "Okres historyczny (np. Starożytna Grecja, Odrodzenie, XX wiek).",
          },
          category: {
            type: Type.STRING,
            description: "Kategoria (np. Przywództwo, Wytrwałość, Innowacja).",
          },
          context: {
            type: Type.STRING,
            description: "Jednozdaniowe wyjaśnienie, dlaczego ten cytat jest istotny dzisiaj.",
          },
        },
        required: ["quote", "author", "era", "category", "context"],
      },
    },
  });

  const rawData = JSON.parse(response.text || "{}");
  
  return {
    ...rawData,
    id: Math.random().toString(36).substring(7),
    timestamp: Date.now(),
  };
};
