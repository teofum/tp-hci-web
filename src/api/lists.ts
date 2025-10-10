import { listsSchema } from '@/schemas/list.schema';
import { API } from './api';
import { fetchAll } from './fetchAll';

export const lists = {
  async get() {
    return await fetchAll(async (page, per_page) => {
      const res = await API.get('shopping-lists')
        .withAuth()
        .withParams({ page: page.toString(), per_page: per_page.toString() })
        .send();
      return listsSchema.array().parse(res);
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

    return listsSchema.parse(res);
  },
};
