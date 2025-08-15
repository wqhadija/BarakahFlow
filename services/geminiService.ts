import { GoogleGenAI, Type } from "@google/genai";
import type { DailyInspiration, GrowthMindsetContent } from '../types';
import type { Language } from "../contexts/LanguageContext";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || " " });

export const getDailyInspiration = async (): Promise<DailyInspiration> => {
  if (!process.env.API_KEY) {
    return {
        tip: "Drink water while sitting down. It's a sunnah and aids in proper hydration, which is beneficial for managing blood pressure.",
        quranPrompt: "Reflect on Surah Ad-Duha (93:3): 'Your Lord has not forsaken you, nor has He become displeased.' How does this verse bring you comfort on challenging days?"
    };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a 'Barakah Tip' combining Islamic Sunnah and a science-backed health fact for women with chronic fatigue/low blood pressure. Also, create a 'Quran Reflection Prompt' based on a verse about hope, patience, or healing.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tip: {
              type: Type.STRING,
              description: "The combined Sunnah and science health tip.",
            },
            quranPrompt: {
              type: Type.STRING,
              description: "The Quran reflection prompt.",
            },
          },
          required: ["tip", "quranPrompt"],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error fetching daily inspiration from Gemini:", error);
    // Return a graceful fallback content
    return {
        tip: "Eating a few dates can provide a quick, natural energy boost. The Prophet (PBUH) recommended them, and science notes their fiber and potassium content help regulate energy.",
        quranPrompt: "Contemplate on Surah Al-Baqarah (2:286): 'Allah does not burden a soul beyond that it can bear.' How does this powerful reminder reframe your struggles with fatigue?"
    };
  }
};

export const getDailyGrowthMindset = async (): Promise<GrowthMindsetContent> => {
    if (!process.env.API_KEY) {
        return {
            gratitudePrompt: "What small blessing today am I thankful for, and how does it contribute to the life I am building for my dunya and akhirah?",
            mindsetBooster: "Verily, with every hardship comes ease.",
            boosterSource: "Surah Ash-Sharh, 94:6"
        };
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate a new, unique 'Gratitude Vision' journal prompt for a Muslim woman focusing on personal and spiritual growth. Also, provide an inspiring 'Mindset Booster' quote from the Quran or Hadith about resilience, patience, or hope, and include its source.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        gratitudePrompt: {
                            type: Type.STRING,
                            description: "The gratitude journal prompt.",
                        },
                        mindsetBooster: {
                            type: Type.STRING,
                            description: "The inspiring Islamic quote.",
                        },
                        boosterSource: {
                            type: Type.STRING,
                            description: "The source of the quote (e.g., 'Surah Al-Baqarah, 2:153').",
                        },
                    },
                    required: ["gratitudePrompt", "mindsetBooster", "boosterSource"],
                },
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error fetching growth mindset content from Gemini:", error);
        return {
            gratitudePrompt: "Reflect on a challenge you overcame. How did relying on Allah strengthen you during that time?",
            mindsetBooster: "And be patient, for indeed, Allah does not allow to be lost the reward of the doers of good.",
            boosterSource: "Surah Hud, 11:115"
        };
    }
};


export const generateDua = async (userInput: string, language: Language, duaLength: 'short' | 'standard'): Promise<string> => {
  const languageFullName = {
      en: 'English',
      ms: 'Bahasa Melayu',
      ar: 'Arabic'
  };

  if (!process.env.API_KEY) {
      switch (language) {
          case 'ms':
              return duaLength === 'short'
                  ? "Ya Allah, kurniakan daku kekuatan dan kemudahan dalam urusanku. Amin."
                  : "Ya Allah, kurniakan daku kekuatan di saat aku lemah, kejernihan di saat fikiranku keruh, dan kemudahan dalam urusanku. Engkaulah sumber segala kekuatan dan penyembuhan. Amin.";
          case 'ar':
              return duaLength === 'short'
                  ? "يا الله، امنحني القوة والصفاء واليسر. آمين."
                  : "يا الله، امنحني القوة عندما أضعف، والصفاء عندما يتشتت ذهني، واليسر في أمري. أنت مصدر كل قوة وكل شفاء. آمين.";
          case 'en':
          default:
              return duaLength === 'short'
                  ? "O Allah, grant me strength, clarity, and ease. Ameen."
                  : "O Allah, grant me strength when I am weak, clarity when my mind is clouded, and ease in my affairs. You are the source of all power and all healing. Ameen.";
      }
  }
  try {
    const lengthInstruction = duaLength === 'short'
        ? "generate a concise yet powerful du'a (supplication) for her, ideally under 30 words."
        : "generate a beautiful, heartfelt, and personal du'a (supplication) for her.";

    const systemInstruction = `You are a gentle, compassionate, and wise Islamic guide. A Muslim woman is expressing her feelings to you. Based on her input, ${lengthInstruction} The du'a should be in ${languageFullName[language]}, be encouraging, and instill hope and tawakkul (reliance on Allah). Do not add any conversational text before or after the du'a. Just provide the prayer itself.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userInput,
        config: {
            systemInstruction,
            temperature: 0.8,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating du'a from Gemini:", error);
    switch (language) {
        case 'ms':
            return "Terdapat isu untuk berhubung dengan AI. Sila cuba sebentar lagi. Semoga Allah mengurniakan anda ketenangan dan kemudahan.";
        case 'ar':
            return "حدثت مشكلة في الاتصال بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى لاحقًا. أسأل الله أن يمنحك السلام واليسر.";
        case 'en':
        default:
            return "There was an issue connecting to the AI. Please try again later. May Allah grant you peace and ease.";
    }
  }
};