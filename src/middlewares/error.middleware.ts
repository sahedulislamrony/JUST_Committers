import { Request, Response, NextFunction } from 'express';
import { config } from '@/config/environment';

export interface ApiError extends Error {
  statusCode: number;
  details?: any;
}

export const createApiError = (statusCode: number, message: string, details?: any): ApiError => {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: any = undefined;

  if (err && typeof err === 'object' && 'statusCode' in err) {
    statusCode = (err as ApiError).statusCode;
    message = err.message;
    details = (err as ApiError).details;
  } else if (err instanceof Error) {
    message = err.message;
  }

  const responseBody = {
    status: 'error',
    statusCode,
    message,
    ...(details && { details }),
    ...(config.isDev && { stack: err.stack }),
  };

  console.error(`[Error] ${req.method} ${req.path} - Status: ${statusCode} - Message: ${message}`);
  if (!config.isProd && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json(responseBody);
};

