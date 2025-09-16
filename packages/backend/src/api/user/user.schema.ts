import { z } from 'zod';

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'A valid email is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'A valid email is required' }),
    password: z.string(),
  }),
});

export const requestPasswordResetSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'A valid email is required' }),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});