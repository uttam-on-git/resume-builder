import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log the error for debugging

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.flatten().fieldErrors,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'An unexpected internal server error occurred.';

  return res.status(statusCode).json({ message });
};