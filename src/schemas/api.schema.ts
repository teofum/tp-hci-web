import z from 'zod';

export function paginatedResponseSchema<O, I>(itemSchema: z.ZodType<O, I>) {
  return z.object({
    data: itemSchema.array(),
    pagination: z.object({
      total: z.int(),
      page: z.int(),
      per_page: z.int(),
      total_pages: z.int(),
      has_next: z.boolean(),
      has_prev: z.boolean(),
    }),
  });
}
