import z from 'zod';

import { dateSchema } from './date.schema';

export const listSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    description: z.string(),
    recurring: z.boolean(),

    metadata: z.object({
      emoji: z.emoji(),
    }),

    owner: z.int(),
    lastPurchasedAt: dateSchema,
    createdAt: dateSchema,
    updatedAt: dateSchema,
  })
  .transform(({ metadata, ...res }) => ({
    ...metadata,
    ...res,
  }));

export type List = z.infer<typeof listSchema>;

export const sharedUsersSchema = z.object({
  id: z.int(),
  name: z.string(),
  surname: z.string(),
  email: z.email(),
  metadata: z.object(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

export type SharedUsers = z.infer<typeof sharedUsersSchema>;
