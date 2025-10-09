<script setup lang="ts">
import { storeToRefs } from 'pinia';

import AddProductDialog from '@/components/products/AddProductDialog.vue';
import ListItem from '@/components/ListItem.vue';
import ManageCategories from '@/components/products/ManageCategories.vue';
import { useStore } from '@/store/store';
import { computed } from 'vue';

const store = useStore();
const { products } = storeToRefs(store);

const productsByCategory = computed(() => {
  const categories: Record<number, [string, typeof products.value]> = {};
  for (const product of products.value) {
    const catId = product.category?.id ?? -1;

    if (!categories[catId]) {
      const catName = product.category?.name ?? 'Sin categoría';
      categories[catId] = [catName, []];
    }

    categories[catId][1].push(product);
  }

  return categories;
});
</script>

<template>
  <v-container max-width="800" class="container">
    <div class="d-flex flex-row justify-space-between align-center w-100">
      <h1 class="text-high-emphasis">Productos</h1>
      <ManageCategories />
    </div>

    <div
      v-for="[key, [categoryName, products]] in Object.entries(
        productsByCategory,
      )"
      :key="key"
    >
      <h2 class="text-medium-emphasis mt-3 category-heading">
        {{ categoryName }}
      </h2>
      <ul>
        <ListItem
          v-for="product in products"
          :key="product.id"
          :name="product.name"
          :emoji="product.emoji"
          :detail="product.category?.name ?? 'Sin categoría'"
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
              <AddProductDialog :product="product">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-list-item
                    v-bind="activatorProps"
                    prepend-icon="mdi-pencil-outline"
                    title="Modificar"
                  />
                </template>
              </AddProductDialog>
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
    </div>
    <div v-if="Object.keys(productsByCategory).length === 0">
      No hay productos
    </div>

    <AddProductDialog>
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          app
          location="bottom end"
          size="x-large"
          text="Agregar producto"
          prepend-icon="mdi-plus"
          variant="flat"
        />
      </template>
    </AddProductDialog>
  </v-container>
</template>

<style scoped>
.category-heading {
  font-size: 1.5rem;
}
</style>
