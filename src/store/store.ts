import { defineStore } from 'pinia';

import { products as productsApi } from '@/api/products';
import { categories as categoriesApi } from '@/api/categories';
import { lists as listsAPI } from '@/api/lists';
import type { Category, Product } from '@/schemas/product.schema';
import type { List } from '@/schemas/list.schema';
import { ref } from 'vue';

/* TODO:
 * hacer lo de history, shred users por lista
 * pantry?
 * purchesed list o purchased items?
 */

export const useStore = defineStore('main', () => {
  const products = ref([] as Product[]);
  const categories = ref([] as Category[]);
  const lists = ref([] as List[]);

  async function init() {
    products.value = await productsApi.get();
    categories.value = await categoriesApi.get();
    lists.value = await listsAPI.get();
    // TODO debug
    lists.value.push({
      id: 1,
      name: 'super',
      description: 'para la semana',
      recurring: true,
      owner: {
        id: 101,
        name: 'Seba',
        surname: 'Lee',
        email: 'seba@example.com',
        metadata: {},
        createdAt: '2025-09-15T09:00:00Z',
        updatedAt: '2025-10-01T10:00:00Z',
      },
      sharedWith: [
        {
          id: 201,
          name: 'test2',
          surname: 'test2',
          email: 'test2@example.com',
        },
        {
          id: 202,
          name: 'test',
          surname: 'test',
          email: 'test@example.com',
        },
      ],
      lastPurchasedAt: '2025-09-15T09:00:00Z',
      createdAt: '2025-09-15T09:00:00Z',
      updatedAt: '2025-09-15T09:00:00Z',
      emoji: '🛒',
    });
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

  //// lists //////////////

  async function addList(
    name: string,
    description: string,
    recurring: boolean,
    emoji: string,
  ) {
    lists.value = [
      ...lists.value,
      await listsAPI.create(name, description, recurring, emoji),
    ];
  }

  async function deleteList(id: number) {
    await listsAPI.delete(id);
    lists.value = lists.value.filter((product) => product.id !== id);
  }

  async function modifyList(
    id: number,
    name: string,
    description: string,
    recurring: boolean,
    emoji: string,
  ) {
    const updatedList = await listsAPI.modify(
      id,
      name,
      description,
      recurring,
      emoji,
    );
    lists.value = lists.value.map((l) => (l.id === id ? updatedList : l));
  }

  // async function addListItem(id: number, quantity: number, unit: string)
  // async function getListItems(id: number, sort: string)
  // async function updateListItem(itemId: number, quantity: number, unit: string)
  // async function togglePurchaseListItem(id: number, itemId: number)
  // async function delelteListItem(id: number, itemId: number)
  // async function ()
  // async function ()
  // async function ()
  // async function ()
  // async function ()
  // async function ()

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
    addList,
    deleteList,
    modifyList,
  };
});
