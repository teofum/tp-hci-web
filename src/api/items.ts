import { itemSchema } from '@/schemas/item.schema';
import { API } from './api';
import { fetchAll } from './fetchAll';

export const items = {
  async get(
    list_id: number,
    sort_by: 'updatedAt' | 'createdAt' | 'lastPurchasedAt' | 'productName',
    sort_order: 'DESC' | 'ASC',
  ) {
    return await fetchAll(async (page, per_page) => {
      const res = await API.get(`shopping-lists/${list_id}/items`)
        .withAuth()
        .withParams({
          id: list_id.toString(),
          page: page.toString(),
          per_page: per_page.toString(),
          sort_by: sort_by.toString(),
          sort_order: sort_order.toString(),
        })
        .send();
      return itemSchema.array().parse(res);
    });
  },

  async create(
    list_id: number,
    productId: number,
    quantity: number,
    unit: string,
    emoji: string,
  ) {
    const res = await API.post(`shopping-lists/${list_id}/items`)
      .withAuth()
      .withBody({
        productId,
        quantity,
        unit,
        metadata: { emoji },
      })
      .send();

    return itemSchema.parse(res);
  },

  async modify(
    list_id: number,
    item_id: number,
    productId: number,
    quantity: number,
    unit: string,
    emoji: string,
  ) {
    const res = await API.put(`shopping-lists/${list_id}/items/${item_id}`)
      .withAuth()
      .withBody({
        productId,
        quantity,
        unit,
        metadata: { emoji },
      })
      .send();

    return itemSchema.parse(res);
  },

  // toggles the purchased status of an item
  async patch(list_id: number, item_id: number) {
    const res = await API.patch(`shopping-lists/${list_id}/items/${item_id}`);
    return itemSchema.parse(res);
  },

  async delete(list_id: number, item_id: number) {
    await API.delete(`shopping-lists/${list_id}/items/${item_id}`)
      .withAuth()
      .send();
  },
};
