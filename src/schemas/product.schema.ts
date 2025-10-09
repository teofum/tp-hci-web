import z from 'zod';

const date = z.stringFormat('date', /^\d+-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);

export const categorySchema = z.object({
  id: z.int(),
  name: z.string(),
  metadata: z.object({}),
  createdAt: date,
  updatedAt: date,
});

export type Category = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  id: z.int(),
  name: z.string(),
  metadata: z.object({}),
  createdAt: date,
  updatedAt: date,
  category: categorySchema,
});

export type Product = z.infer<typeof productSchema>;
