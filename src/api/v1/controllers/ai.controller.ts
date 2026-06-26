import { Request, Response, NextFunction } from 'express';
import { generateChatResponse } from '@/api/v1/services/ai.service';
import { createApiError } from '@/middlewares/error.middleware';

export const handleChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      throw createApiError(400, 'Text is required and must be a string');
    }

    const aiResponse = await generateChatResponse(text);

    res.status(200).json({
      status: 'success',
      data: {
        response: aiResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};
