<script setup lang="ts">
import { storeToRefs } from 'pinia';

import AddProductDialog from '@/components/products/AddProductDialog.vue';
import ListItem from '@/components/ListItem.vue';
import ManageCategories from '@/components/products/ManageCategories.vue';
import { useStore } from '@/store/store';
import { computed } from 'vue';
import { ref } from 'vue';

const store = useStore();
const { products } = storeToRefs(store);

const filter = ref('');
const groupByCategory = ref(true);

const filteredProducts = computed(() =>
  products.value.filter(
    (product) =>
      !filter.value ||
      product.name.toLowerCase().includes(filter.value.toLowerCase()),
  ),
);

const productsByCategory = computed(() => {
  const categories: Record<number, [string, typeof products.value]> = {};
  for (const product of filteredProducts.value) {
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
      <h1 class="heading text-high-emphasis">Productos</h1>
      <ManageCategories />
    </div>

    <div class="d-flex flex-column ga-2 my-4">
      <v-text-field
        v-model="filter"
        label="Buscar"
        type="text"
        class="w-100"
        clearable
        clear-icon="mdi-close-circle-outline"
      />
      <v-switch
        v-model="groupByCategory"
        label="Agrupar por categoría"
        inset
        color="primary"
        class="switch"
      />
    </div>

    <div v-if="groupByCategory">
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
    </div>
    <div v-else>
      <ul>
        <ListItem
          v-for="product in filteredProducts"
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

    <div
      v-if="
        Object.keys(productsByCategory).length === 0 ||
        filteredProducts.length === 0
      "
    >
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
.heading {
  font-size: 3rem;
  font-weight: 700;
}

.category-heading {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>

<style>
.switch {
  .v-selection-control {
    flex-direction: row-reverse !important;

    .v-label {
      padding-inline-start: 0;
      padding-inline-end: 10px;
    }
  }
}
</style>
