import { Router, Request, Response, NextFunction } from 'express';
import { handleAnalyzeTicket } from '@/api/v1/controllers/ticket.controller';
import { createApiError } from '@/middlewares/error.middleware';

const router = Router();

router.route('/analyze-ticket')
  .post(handleAnalyzeTicket)
  .all((req: Request, res: Response, next: NextFunction) => {
    next(createApiError(405, `Method ${req.method} not allowed on /analyze-ticket`));
  });

export default router;
