import { listSchema } from '@/schemas/list.schema';
import { API } from './api';
import { fetchAll } from './fetchAll';
import { purchaseSchema } from '@/schemas/purchases.schema';
import { paginatedResponseSchema } from '@/schemas/api.schema';
import z from 'zod';

export const purchases = {
  async get() {
    return await fetchAll(async (page, per_page) => {
      const res = await API.get('purchases')
        .withAuth()
        .withParams({
          page: page.toString(),
          per_page: per_page.toString(),
          sort_by: 'createdAt',
          order: 'DESC',
        })
        .send();
      return paginatedResponseSchema(purchaseSchema).parse(res).data;
    });
  },

  async getPurchaseDetails(purchase_id: number) {
    const res = await API.get(`purchases/${purchase_id}`)
      .withAuth()
      .withParams({
        id: purchase_id.toString(),
      })
      .send();
    return purchaseSchema.parse(res);
  },

  async restore(purchase_id: number) {
    const res = await API.post(`purchases/${purchase_id}/restore`)
      .withAuth()
      .send();
    return z.object({ list: listSchema }).parse(res).list;
  },
};
