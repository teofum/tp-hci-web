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
        <v-menu>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              variant="text"
              icon="mdi-dots-vertical"
            />
          </template>

          <v-list>
            <v-list-item
              prepend-icon="mdi-pencil-outline"
              title="Modificar"
              @click="console.log('clicky')"
            />
            <v-list-item
              class="text-red"
              prepend-icon="mdi-delete-outline"
              title="Eliminar"
              @click="store.deleteProduct(product.id)"
            />
          </v-list>
        </v-menu>
      </ListItem>
    </ul>
    <div v-else>No hay productos</div>

    <AddProductDialog />
  </v-container>
</template>

<style scoped></style>
