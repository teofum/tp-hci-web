import { listSchema } from '@/schemas/list.schema';
import { API } from './api';
import { fetchAll } from './fetchAll';
import z from 'zod';

export const lists = {
  async get() {
    return await fetchAll(async (page, per_page) => {
      const res = await API.get('shopping-lists')
        .withAuth()
        .withParams({ page: page.toString(), per_page: per_page.toString() })
        .send();
      return listSchema.array().parse(res);
    });
  },

  async create(
    name: string,
    description: string,
    recurring: boolean,
    emoji: string,
  ) {
    const res = await API.post('shopping-lists')
      .withAuth()
      .withBody({
        name,
        description,
        recurring,
        metadata: { emoji },
      })
      .send();

    return listSchema.parse(res);
  },

  async modify(
    id: number,
    name: string,
    description: string,
    recurring: boolean,
    emoji: string,
  ) {
    const res = await API.put(`shopping-lists/${id}`)
      .withAuth()
      .withBody({
        name,
        description,
        recurring,
        metadata: { emoji },
      })
      .send();

    return z.object({ list: listSchema }).parse(res).list;
  },

  async delete(id: number) {
    await API.delete(`shopping-lists/${id}`).withAuth().send();
  },
};
