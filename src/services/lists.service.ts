import { api } from "@/lib/api";

export type ShoppingListDto = {
  id: number;
  name: string;
  description?: string | null;
  itemCount?: number;           // if your API returns this, we show it
  imageUrl?: string | null;     // optional, for your avatar/image
};

export async function getLists(params: {
  page?: number;
  per_page?: number;
  order?: "ASC" | "DESC";
  sort_by?: "name" | "owner" | "createdAt" | "updatedAt" | "lastPurchasedAt";
  name?: string;
  owner?: boolean;
  recurring?: boolean;
} = {}) {
  const { data } = await api.get("/api/shopping-lists", { params });
  // Some backends return { data, meta }, others return an array directly.
  // Normalize to an array for the UI:
  return Array.isArray(data) ? data : data?.data ?? [];
}
