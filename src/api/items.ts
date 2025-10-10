import { itemSchema } from '@/schemas/item.schema';
import { API } from './api';
import { fetchAll } from './fetchAll';

export const items = {
  async get(
    id: number,
    sort_by: 'updatedAt' | 'createdAt' | 'lastPurchasedAt' | 'productName',
    sort_order: 'DESC' | 'ASC',
  ) {
    return await fetchAll(async (page, per_page) => {
      const res = await API.get(`shopping-lists/${id}/items`)
        .withAuth()
        .withParams({
          id: id.toString(),
          page: page.toString(),
          per_page: per_page.toString(),
          sort_by: sort_by.toString(),
          sort_order: sort_order.toString(),
        })
        .send();
      return itemSchema.array().parse(res);
    });
  },
};
