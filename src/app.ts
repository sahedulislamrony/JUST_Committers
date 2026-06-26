import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { config } from './config/environment';
import { rateLimiter } from './middlewares/rateLimiter.middleware';
import { errorHandler, createApiError } from './middlewares/error.middleware';
import apiRouter from './api/index';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(hpp());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api', rateLimiter);
app.use('/api', apiRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createApiError(404, `Route ${req.method} ${req.path} not found`));
});

app.use(errorHandler);

export default app;
