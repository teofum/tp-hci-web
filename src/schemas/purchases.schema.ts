import z from 'zod';

import { userSchema } from './user.schema';
import { listSchema } from './list.schema';
import { itemSchema } from './item.schema';

export const purchaseSchema = z.object({
  id: z.int(),
  metadata: z.object({}),
  owner: userSchema,
  list: listSchema,
  listItemArray: z.array(itemSchema).optional(),
});

export type Purchase = z.infer<typeof purchaseSchema>;
