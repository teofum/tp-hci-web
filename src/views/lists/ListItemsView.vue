<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';
import AddItemDialog from '@/components/products/AddProductDialog.vue';
import ListItem from '@/components/ListItem.vue';
import ShareListDialog from '@/components/lists/ShareListDialog.vue';

import ItemEntry from '@/components/list/ItemEntry.vue';
import NewItemButton from '@/components/list/NewItemButton.vue';

const store = useStore();

const router = useRouter();

function goBack() {
  router.push('/');
}

const sharePopupTrigger = ref(false);

function TogglePopup() {
  sharePopupTrigger.value = !sharePopupTrigger.value;
}

// TODO debug
const { products } = storeToRefs(store); // TODO esto cambiarlo a productos dentro de la lista en sí

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
  <ItemEntry />
  <NewItemButton> + Nuevo Item </NewItemButton>

  <!-- new structure, TODO ir migrando lo de arriba acá  -->

  <v-container max-width="800" class="container">
    <v-btn @click="goBack" variant="text" prepend-icon="mdi-chevron-left"
      >Listas</v-btn
    >
    <div class="d-flex flex-row justify-space-between align-center w-100">
      <h1 class="heading text-high-emphasis">TODO nombre lista</h1>
      <ShareListDialog />
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
    </div>

    <div class="d-flex justify-space-between">
      <v-select
        :items="['Fecha', 'Items']"
        label="Ordenar por"
        style="max-width: 160px"
      ></v-select>
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
            <div class="d-flex justify-space-between">
              <v-checkbox-btn></v-checkbox-btn>
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
            </div>
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
          <div class="d-flex justify-space-between">
            <v-checkbox-btn></v-checkbox-btn>
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
          </div>
        </ListItem>
      </ul>
    </div>

    <div
      v-if="
        Object.keys(productsByCategory).length === 0 ||
        filteredProducts.length === 0
      "
    >
      No hay items
    </div>

    <AddItemDialog>
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          app
          location="bottom end"
          size="x-large"
          text="Agregar item"
          prepend-icon="mdi-plus"
          variant="flat"
        />
      </template>
    </AddItemDialog>
  </v-container>
</template>

<style>
.heading {
  font-size: 3rem;
  font-weight: 700;
}

.category-heading {
  font-size: 1.5rem;
  font-weight: 700;
}

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
