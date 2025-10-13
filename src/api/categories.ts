import { categorySchema } from '@/schemas/product.schema';
import { API } from './api';
import { fetchAll } from './fetchAll';
import { paginatedResponseSchema } from '@/schemas/api.schema';

export const categories = {
  async get() {
    return await fetchAll(async (page, pageSize) => {
      const res = await API.get('categories')
        .withAuth()
        .withParams({ page: page.toString(), per_page: pageSize.toString() })
        .send();
      return paginatedResponseSchema(categorySchema).parse(res).data;
    });
  },

  async create(name: string, emoji: string) {
    const res = await API.post('categories')
      .withAuth()
      .withBody({
        name,
        metadata: { emoji },
      })
      .send();

    return categorySchema.parse(res);
  },

  async modify(id: number, name: string, emoji: string) {
    const res = await API.put(`categories/${id}`)
      .withAuth()
      .withBody({
        name,
        metadata: { emoji },
      })
      .send();

    return categorySchema.parse(res);
  },

  async delete(id: number) {
    await API.delete(`categories/${id}`).withAuth().send();
  },
};
