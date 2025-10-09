<script setup lang="ts">
import { storeToRefs } from 'pinia';

import AddProductDialog from '@/components/products/AddProductDialog.vue';
import ListItem from '@/components/ListItem.vue';
import ManageCategories from '@/components/products/ManageCategories.vue';
import { useStore } from '@/store/store';

const store = useStore();
const { products } = storeToRefs(store);
</script>

<template>
  <v-container max-width="800" class="container">
    <div class="d-flex flex-row justify-space-between align-center w-100">
      <h1>Productos</h1>
      <ManageCategories />
    </div>

    <ul v-if="products.length">
      <ListItem
        v-for="product in products"
        :key="product.id"
        :name="product.name"
        :emoji="product.emoji"
        :detail="product.category.name"
      >
      </ListItem>
    </ul>
    <div v-else>no products</div>

    <AddProductDialog />
  </v-container>
</template>

<style scoped></style>
