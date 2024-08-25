import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

let chat;

export const initializeChat = async () => {
  chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: 'Hello' }],
      },
      {
        role: 'model',
        parts: [{ text: 'Great to meet you. What would you like to know?' }],
      },
    ],
  });
};

export const sendMessage = async (message) => {
  if (!chat) {
    await initializeChat();
  }
  const result = await chat.sendMessage(message);
  return result.response.text();
};
