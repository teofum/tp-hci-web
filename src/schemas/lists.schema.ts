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

export type ListCategory = z.infer<typeof categorySchema>;
