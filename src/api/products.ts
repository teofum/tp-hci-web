import { productSchema } from '@/schemas/product.schema';
import { API } from './api';
import { fetchAll } from './fetchAll';

export const products = {
  async get() {
    return await fetchAll(async (page, pageSize) => {
      const res = await API.get('products')
        .withAuth()
        .withParams({ page: page.toString(), per_page: pageSize.toString() })
        .send();
      return productSchema.array().parse(res);
    });
  },

  async create(name: string, emoji: string, categoryId: number | null) {
    const res = await API.post('products')
      .withAuth()
      .withBody({
        name,
        category: categoryId !== null ? { id: categoryId } : undefined,
        metadata: { emoji },
      })
      .send();

    return productSchema.parse(res);
  },

  async delete(id: number) {
    await API.delete(`products/${id}`).withAuth().send();
  },
};
