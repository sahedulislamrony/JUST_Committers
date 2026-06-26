import { Router } from 'express';
import healthRoute from '@/api/v1/routes/health.route';
import ticketRoute from '@/api/v1/routes/ticket.route';

const v1Router = Router();

v1Router.use('/health', healthRoute);
v1Router.use('/', ticketRoute);

export default v1Router;
