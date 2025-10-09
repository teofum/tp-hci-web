import z from 'zod';

import { dateSchema } from './date.schema';

export const loginResultSchema = z.object({
  token: z.string(),
});

export type LoginResult = z.infer<typeof loginResultSchema>;

export const userSchema = z.object({
  id: z.int(),
  name: z.string(),
  surname: z.string(),
  email: z.email(),
  metadata: z.object(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export type User = z.infer<typeof userSchema>;
