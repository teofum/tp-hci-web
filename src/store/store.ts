import { defineStore } from 'pinia';

const initializeState = () => {
  return {
    products: [],
  };
};

export const useStore = defineStore('main', {
  state: initializeState,
  getters: {},
  actions: {},
});
