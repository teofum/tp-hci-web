import z from 'zod';

import { dateSchema } from './date.schema';
import { userSchema } from './user.schema';

export const listSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    description: z.string(),
    recurring: z.boolean(),

    metadata: z.object({
      emoji: z.emoji(),
    }),

    owner: userSchema,
    sharedWith: z.array(userSchema),
    lastPurchasedAt: dateSchema.nullable(),
    createdAt: dateSchema,
    updatedAt: dateSchema,
  })
  .transform(({ metadata, ...res }) => ({
    ...metadata,
    ...res,
  }));

export type List = z.infer<typeof listSchema>;
