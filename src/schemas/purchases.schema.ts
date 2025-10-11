import z from 'zod';

import { userSchema } from './user.schema';
import { listSchema } from './list.schema';
import { itemSchema } from './item.schema';

export const purchseSchema = z.object({
  id: z.int(),
  metadata: z.object({
    emoji: z.emoji(),
  }),
  owner: userSchema,
  list: listSchema,
  listItemArray: z.array(itemSchema).optional(),
});

export type Purchase = z.infer<typeof purchseSchema>;
