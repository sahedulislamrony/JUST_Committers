import OpenAI from 'openai';
import { config } from '@/config/environment';

const SYSTEM_SAFEGUARD = "You are a helpful, respectful, and safe AI assistant. Please avoid any harmful, offensive, or inappropriate generation.";

export const generateChatResponse = async (text: string): Promise<string> => {
  const openai = new OpenAI({
    apiKey: config.deepseekApiKey,
    baseURL: config.deepseekBaseUrl,
  });

  const response = await openai.chat.completions.create({
    model: config.deepseekModel,
    messages: [
      { role: 'system', content: SYSTEM_SAFEGUARD },
      { role: 'user', content: text },
    ],
  });

  return response.choices[0]?.message?.content || 'No response content returned';
};
