import { Router } from 'express';
import { handleChat } from '@/api/v1/controllers/ai.controller';

const router = Router();

router.post('/chat', handleChat);

export default router;
