import { defineStore } from 'pinia';

import { products as productsApi } from '@/api/products';
import { categories as categoriesApi } from '@/api/categories';
import type { Category, Product } from '@/schemas/product.schema';
import type { List } from '@/schemas/list.schema';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
  const products = ref([] as Product[]);
  const categories = ref([] as Category[]);
  const lists = ref([] as List[]);

  async function init() {
    products.value = await productsApi.get();
    categories.value = await categoriesApi.get();

    // TODO debug
    lists.value = [
      {
        id: 1,
        name: 'Supermercado',
        emoji: '🛒',
        createdAt: '2025-10-10 13:15:00',
        updatedAt: '2025-10-10 13:15:00',
      },
      {
        id: 2,
        name: 'Fiesta',
        emoji: '🎉',
        createdAt: '2025-10-10 13:15:00',
        updatedAt: '2025-10-10 13:15:00',
      },
    ];

    // lists.value = await listsApi.get();
  }

  async function addProduct(
    name: string,
    emoji: string,
    categoryId: number | null,
  ) {
    products.value = [
      ...products.value,
      await productsApi.create(name, emoji, categoryId),
    ];
  }

  async function addCategory(name: string, emoji: string) {
    categories.value = [
      ...categories.value,
      await categoriesApi.create(name, emoji),
    ];
  }

  async function modifyProduct(
    id: number,
    name: string,
    emoji: string,
    categoryId: number | null,
  ) {
    const newProduct = await productsApi.modify(id, name, emoji, categoryId);
    products.value = [
      ...products.value.filter((product) => product.id !== id),
      newProduct,
    ];
  }

  async function modifyCategory(id: number, name: string, emoji: string) {
    const newCategory = await categoriesApi.modify(id, name, emoji);
    categories.value = [
      ...categories.value.filter((category) => category.id !== id),
      newCategory,
    ];

    // Refetch products as cached category data will be out of date
    products.value = await productsApi.get();
  }

  async function deleteProduct(id: number) {
    await productsApi.delete(id);
    products.value = products.value.filter((product) => product.id !== id);
  }

  async function deleteCategory(id: number) {
    await categoriesApi.delete(id);
    categories.value = categories.value.filter(
      (category) => category.id !== id,
    );

    // Refetch products as cached category data will be out of date
    products.value = await productsApi.get();
  }

  return {
    products,
    categories,
    lists,
    init,
    addProduct,
    addCategory,
    modifyProduct,
    modifyCategory,
    deleteProduct,
    deleteCategory,
  };
});
