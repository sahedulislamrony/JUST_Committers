import { Router } from 'express';
import { handleAnalyzeTicket } from '@/api/v1/controllers/ticket.controller';

const router = Router();

router.post('/analyze-ticket', handleAnalyzeTicket);

export default router;
