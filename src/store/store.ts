import { defineStore } from 'pinia';

import { categories as categoriesApi } from '@/api/categories';
import { products as productsApi } from '@/api/products';
import { ref } from 'vue';
import type { Category, Product } from '@/schemas/product.schema';

export const useStore = defineStore('main', () => {
  const products = ref([] as Product[]);
  const categories = ref([] as Category[]);

  async function init() {
    products.value = await productsApi.get();
    categories.value = await categoriesApi.get();
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
    init,
    addProduct,
    addCategory,
    modifyProduct,
    modifyCategory,
    deleteProduct,
    deleteCategory,
  };
});
