import { Router } from 'express';
import { getHealth } from '@/api/v1/controllers/health.controller';

const router = Router();

router.get('/', getHealth);

export default router;
