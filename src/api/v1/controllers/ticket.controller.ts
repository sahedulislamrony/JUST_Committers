import { Request, Response, NextFunction } from 'express';
import { analyzeTicketRequestSchema } from '../helpers/ticket.schema';
import { sanitizePayload } from '../helpers/security.helper';
import { analyzeTicketWithAI } from '../services/ticket.service';
import { createApiError } from '@/middlewares/error.middleware';

export const handleAnalyzeTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 1. Zod Request Schema Validation
    const validationResult = analyzeTicketRequestSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw createApiError(
        400,
        'Invalid request schema structure',
        validationResult.error.format()
      );
    }

    // 2 & 3. Run Security Checks (Prompt Injection and PIN/OTP Sanitization)
    const sanitizedPayload = sanitizePayload(validationResult.data);

    // 4. Invoke AI Service (contains structured response & output validation)
    const analysisResponse = await analyzeTicketWithAI(sanitizedPayload);

    // 5. Send Final response
    res.status(200).json(analysisResponse);
  } catch (error) {
    next(error);
  }
};
