import { Router } from 'express';
import healthRoute from '@/api/v1/routes/health.route';
import aiRoute from '@/api/v1/routes/ai.route';

const v1Router = Router();

v1Router.use('/health', healthRoute);
v1Router.use('/ai', aiRoute);

export default v1Router;
