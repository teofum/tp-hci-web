import z from 'zod';

import { dateSchema } from './date.schema';
import { productSchema } from './product.schema';

export const itemSchema = z
  .object({
    id: z.int(),
    quantity: z.int(),
    unit: z.string().nullable(),
    metadata: z.object({}),
    purchased: z.boolean(),
    lastPurchasedAt: dateSchema.nullable(),
    createdAt: dateSchema,
    updatedAt: dateSchema,
    product: productSchema,
  })
  .transform(({ metadata, ...res }) => ({
    ...metadata,
    ...res,
  }));

export type Item = z.infer<typeof itemSchema>;
