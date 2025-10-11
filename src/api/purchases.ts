import { listSchema } from '@/schemas/list.schema';
import { API } from './api';
import { fetchAll } from './fetchAll';
import { purchseSchema } from '@/schemas/purchases.schema';

export const purchases = {
  async get(
    list_id: number,
    sort_by: 'createdAt' | 'list' | 'id',
    order: 'ASC' | 'DESC',
  ) {
    return await fetchAll(async (page, per_page) => {
      const res = await API.get('purchases')
        .withAuth()
        .withParams({
          list_id: list_id.toString(),
          page: page.toString(),
          per_page: per_page.toString(),
          sort_by: sort_by.toString(),
          order: order.toString(),
        })
        .send();
      return purchseSchema.array().parse(res);
    });
  },

  async getPurchaseDetails(purchase_id: number) {
    const res = await API.get(`purchase/${purchase_id}`).withAuth().withParams({
      id: purchase_id.toString(),
    });
    return purchseSchema.parse(res);
  },

  async restore(purchase_id: number) {
    const res = await API.post(`purchase/${purchase_id}/restore`)
      .withAuth()
      .withParams({
        id: purchase_id.toString(),
      });
    return listSchema.parse(res);
  },
};
