import { Request, Response, NextFunction } from 'express';
import { getHealthData } from '../services/health.service';

export const getHealth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const healthData = getHealthData();
    res.status(200).json({
      status: 'success',
      data: healthData,
    });
  } catch (error) {
    next(error);
  }
};
