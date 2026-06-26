import { Router } from 'express';
import healthRoute from './health.route';

const v1Router = Router();

v1Router.use('/health', healthRoute);

export default v1Router;
