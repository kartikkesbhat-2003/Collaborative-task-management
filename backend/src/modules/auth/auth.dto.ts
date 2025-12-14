import { z } from 'zod';

export const registerDto = z.object({
  name: z.string().min(1).max(50).trim(),
  email: z.string().email().toLowerCase(),
  password: z.string().min(6).max(100),
});

export type RegisterDto = z.infer<typeof registerDto>;

export const loginDto = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1),
});

export type LoginDto = z.infer<typeof loginDto>;