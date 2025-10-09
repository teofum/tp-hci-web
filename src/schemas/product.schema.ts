import z from 'zod';

import { dateSchema } from './date.schema';

export const categorySchema = z.object({
  id: z.int(),
  name: z.string(),
  metadata: z.object({}),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export type Category = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  id: z.int(),
  name: z.string(),
  metadata: z.object({}),
  createdAt: dateSchema,
  updatedAt: dateSchema,
  category: categorySchema,
});

export type Product = z.infer<typeof productSchema>;
