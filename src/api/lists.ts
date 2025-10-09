const API_URL = 'http://localhost:8080/api';

export const lists = {
  async getLists(
    params: {
      page?: number;
      per_page?: number;
      order?: 'ASC' | 'DESC';
      sort_by?:
        | 'name'
        | 'owner'
        | 'createdAt'
        | 'updatedAt'
        | 'lastPurchasedAt';
      name?: string;
      owner?: boolean;
      recurring?: boolean;
    } = {},
  ) {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    const response = await fetch(
      `${API_URL}/shopping-lists?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    );
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return Array.isArray(data) ? data : (data?.data ?? []);
  },
};
