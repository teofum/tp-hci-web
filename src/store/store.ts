import { ref } from 'vue';
import { defineStore } from 'pinia';

import { products as productsApi } from '@/api/products';
import { categories as categoriesApi } from '@/api/categories';
import { lists as listsAPI } from '@/api/lists';
import { items as itemsAPI } from '@/api/items';
import { purchases as purchasesAPI } from '@/api/purchases';
import { auth as authApi } from '@/api/users';
import type { Category, Product } from '@/schemas/product.schema';
import type { List } from '@/schemas/list.schema';
import type { Item } from '@/schemas/item.schema';
import type { Purchase } from '@/schemas/purchases.schema';
import type { User } from '@/schemas/user.schema';

export const useStore = defineStore('main', () => {
  const products = ref([] as Product[]);
  const categories = ref([] as Category[]);
  const lists = ref([] as List[]);

  const items = ref({} as Record<List['id'], Item[]>);
  const history = ref([] as Purchase[]);
  const user = ref<User>();

  async function init() {
    user.value = await authApi.getCurrentUser();
    products.value = await productsApi.get();
    categories.value = await categoriesApi.get();
    lists.value = await listsAPI.get();
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
    lists.value = lists.value.filter((list) => list.id !== id);
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

  async function purchaseList(id: number) {
    const list = await listsAPI.purchase(id);
    if (list.recurring) {
      const updatedList = await listsAPI.reset(id);
      lists.value = lists.value.map((l) => (l.id === id ? updatedList : l));
    } else {
      lists.value = lists.value.filter((list) => list.id !== id);
    }
  }

  /// share list ///////////////////////

  async function shareList(id: number, email: string) {
    const updatedList = await listsAPI.share(id, email);
    lists.value = lists.value.map((l) => (l.id === id ? updatedList : l));
  }

  async function unshareList(id: number, userId: number) {
    await listsAPI.unshare(id, userId);
    lists.value = lists.value.map((l) =>
      l.id === id
        ? { ...l, sharedWith: l.sharedWith.filter((u) => u.id !== userId) }
        : l,
    );
  }

  /// list /////////////////////////////

  async function getListItems(
    list_id: number,
    sort_by: 'updatedAt' | 'createdAt' | 'lastPurchasedAt' | 'productName',
    sort_order: 'DESC' | 'ASC',
  ) {
    items.value = {
      ...items.value,
      [list_id]: await itemsAPI.get(list_id, sort_by, sort_order),
    };
  }

  async function addListItem(
    list_id: number,
    productId: number,
    quantity: number,
    unit: string,
  ) {
    items.value[list_id] = [
      ...items.value[list_id],
      await itemsAPI.create(list_id, productId, quantity, unit),
    ];
  }

  async function updateListItem(
    list_id: number,
    item_id: number,
    productId: number,
    quantity: number,
    unit: string,
  ) {
    const updatedItem = await itemsAPI.modify(
      list_id,
      item_id,
      productId,
      quantity,
      unit,
    );
    items.value[list_id] = items.value[list_id].map((l) =>
      l.id === item_id ? updatedItem : l,
    );
  }

  async function togglePurchaseListItem(
    list_id: number,
    itemId: number,
    purchased: boolean,
  ) {
    const updatedItem = await itemsAPI.togglePurchased(
      list_id,
      itemId,
      purchased,
    );

    items.value[list_id] = items.value[list_id].map((item) =>
      item.id === itemId ? updatedItem : item,
    );
  }

  async function deleteListItem(list_id: number, itemId: number) {
    await itemsAPI.delete(list_id, itemId);
    items.value[list_id] = items.value[list_id].filter(
      (item) => item.id !== itemId,
    );
  }

  /// purchased / history /////////

  async function getPurchases() {
    history.value = await purchasesAPI.get();
  }

  async function restorePurchase(purchase_id: number) {
    const newList = await purchasesAPI.restore(purchase_id);
    lists.value = [...lists.value, newList];
  }

  return {
    user,
    products,
    categories,
    lists,
    items,
    history,
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
    shareList,
    unshareList,
    getListItems,
    addListItem,
    updateListItem,
    togglePurchaseListItem,
    deleteListItem,
    getPurchases,
    restorePurchase,
    purchaseList,
  };
});
