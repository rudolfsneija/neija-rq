import { Response } from 'express';

/**
 * Standardized error handling for API responses
 */
export function handleError(res: Response, err: unknown, message: string): void {
  const error = err instanceof Error ? err : new Error(String(err) || 'Unknown error');
  console.error(`${message}:`, error);
  res.status(500).json({ error: message });
}