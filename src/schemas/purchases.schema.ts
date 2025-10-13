import z from 'zod';

import { userSchema } from './user.schema';
import { listSchema } from './list.schema';
import { itemSchema } from './item.schema';
import { dateSchema } from './date.schema';

export const purchaseSchema = z.object({
  id: z.int(),
  metadata: z.object({}),
  owner: userSchema,
  list: listSchema,
  items: z.array(itemSchema),
  createdAt: dateSchema,
});

export type Purchase = z.infer<typeof purchaseSchema>;
