import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY + '';
const MODEL_NAME = 'gemini-2.5-flash';// As of April 2023

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 8192,
    },
    systemInstruction: "You are a helpful assistant that explains knowledges best practices. Clarify that the answer if the data is beyond your model training cutoff date.",
});

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};