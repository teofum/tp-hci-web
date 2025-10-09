import z from 'zod';

import { dateSchema } from './date.schema';

export const categorySchema = z
  .object({
    id: z.int(),
    name: z.string(),
    metadata: z.object({
      emoji: z.emoji(),
    }),
    createdAt: dateSchema,
    updatedAt: dateSchema,
  })
  .transform(({ metadata, ...res }) => ({
    ...metadata,
    ...res,
  }));

export type Category = z.infer<typeof categorySchema>;

export const productSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    metadata: z.object({
      emoji: z.emoji(),
    }),
    createdAt: dateSchema,
    updatedAt: dateSchema,
    category: categorySchema,
  })
  .transform(({ metadata, ...res }) => ({
    ...metadata,
    ...res,
  }));

export type Product = z.infer<typeof productSchema>;
