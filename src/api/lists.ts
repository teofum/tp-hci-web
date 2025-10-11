import { listSchema, sharedUsersSchema } from '@/schemas/list.schema';
import { API } from './api';
import { fetchAll } from './fetchAll';

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

    return listSchema.parse(res);
  },

  async delete(id: number) {
    await API.delete(`shopping-lists/${id}`).withAuth().send();
  },

  async purchase(id: number) {
    await API.post(`shopping-lists/${id}/purchase`).withAuth().send();
  },

  async reset(id: number) {
    await API.post(`shopping-lists/${id}/reset`).withAuth().send();
  },

  async share(id: number, email: string) {
    await API.post(`shopping-lists/${id}/share`)
      .withAuth()
      .withBody({
        email,
      })
      .send();
  },

  async sharedUsers(id: number) {
    const res = await API.get(`shopping-lists/${id}/shared-users`)
      .withAuth()
      .send();
    return sharedUsersSchema.array().parse(res);
  },

  async unshareUser(listId: number, userId: number) {
    await API.delete(`shopping-lists/${listId}/share/${userId}`)
      .withAuth()
      .send();
  },
};
