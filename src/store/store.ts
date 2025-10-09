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

  async function addProduct(name: string, emoji: string, categoryId: number) {
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

  return { products, categories, init, addProduct, addCategory };
});
