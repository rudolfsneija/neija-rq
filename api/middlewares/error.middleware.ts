import { Request, Response, NextFunction } from 'express';

// Use underscore prefix to indicate intentionally unused parameter
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
};