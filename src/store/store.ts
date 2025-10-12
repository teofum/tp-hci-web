import { defineStore } from 'pinia';

import { products as productsApi } from '@/api/products';
import { categories as categoriesApi } from '@/api/categories';
import { lists as listsAPI } from '@/api/lists';
import { items as itemsAPI } from '@/api/items';
import { purchases as purchasesAPI } from '@/api/purchases';
import type { Category, Product } from '@/schemas/product.schema';
import type { List, SharedUsers } from '@/schemas/list.schema';
import type { Item } from '@/schemas/item.schema';
import type { Purchase } from '@/schemas/purchases.schema';
import { ref } from 'vue';

/* TODO:
 * hacer lo de history, shared users por lista
 * pantry?
 * purchesed list o purchased items?
 */

export const useStore = defineStore('main', () => {
  const products = ref([] as Product[]);
  const categories = ref([] as Category[]);
  const lists = ref([] as List[]);

  const items = ref({} as Record<List['id'], Item[]>);
  const sharedWith = ref({} as Record<List['id'], SharedUsers[]>);
  const history = ref({} as Record<List['id'], Purchase[]>);

  async function init() {
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

  /// share list ///////////////////////

  async function getSharedUsers(id: number) {
    sharedWith.value[id] = await listsAPI.sharedUsers(id);
  }

  async function shareList(id: number, email: string) {
    await listsAPI.share(id, email);
    await getSharedUsers(id);
  }

  async function unshareList(id: number, userId: number) {
    await listsAPI.unshare(id, userId);
    await getSharedUsers(id);
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
    console.log(items.value);
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
    const updatedItems = await itemsAPI.modify(
      list_id,
      item_id,
      productId,
      quantity,
      unit,
    );
    // todo esto revisar
    items.value[list_id] = items.value[list_id].map((l) =>
      l.id === list_id ? updatedItems : l,
    );
  }

  async function togglePurchaseListItem(list_id: number, itemId: number) {
    const updatedItem = await itemsAPI.patch(list_id, itemId);

    items.value[list_id] = items.value[list_id].map((item) =>
      item.id === itemId ? { ...item, purchased: updatedItem.purchased } : item,
    );
  }

  async function delelteListItem(list_id: number, itemId: number) {
    await itemsAPI.delete(list_id, itemId);
    items.value[list_id] = items.value[list_id].filter(
      (item) => item.id !== list_id,
    );
  }

  /// purchased / history /////////

  async function getPurchases(
    list_id: number,
    sort_by: 'createdAt' | 'list' | 'id',
    order: 'ASC' | 'DESC',
  ) {
    history.value[list_id] = await purchasesAPI.get(list_id, sort_by, order);
  }

  // esta medio sus
  //  async function getPurchaseDetails( purchase_id: number ) {
  //    return await purchasesAPI.getPurchaseDetails(purchase_id);
  //  }

  async function restorPurchase(purchase_id: number) {
    await purchasesAPI.restore(purchase_id);
  }

  return {
    products,
    categories,
    lists,
    items,
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
    getSharedUsers,
    shareList,
    unshareList,
    getListItems,
    addListItem,
    updateListItem,
    togglePurchaseListItem,
    deleteListItem: delelteListItem,
    getPurchases,
    restorPurchase,
  };
});
