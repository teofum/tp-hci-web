<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import ListItem from '@/components/ListItem.vue';
import EmojiPickerButton from '@/components/EmojiPickerButton.vue';
import ManageCategories from '@/components/products/ManageCategories.vue';
import { useStore } from '@/store/store';

const store = useStore();
const { products, categories } = storeToRefs(store);

const productName = ref('');
const productEmoji = ref('📦');
const productCategory = ref(1);

async function addProduct() {
  store.addProduct(
    productName.value,
    productEmoji.value,
    productCategory.value,
  );
}
</script>

<template>
  <v-container max-width="800" class="container">
    <h1>Productos</h1>
    <ManageCategories />

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

    <v-dialog max-width="600">
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

      <template v-slot:default="{ isActive }">
        <v-card variant="outlined" class="bg-surface" title="Agregar producto">
          <v-card-item>
            <div class="d-flex flex-column align-center py-2 ga-4">
              <EmojiPickerButton v-model="productEmoji" />

              <v-text-field
                v-model="productName"
                label="Nombre"
                type="text"
                class="w-100"
              />

              <v-select
                v-model="productCategory"
                label="Categoría"
                :items="categories"
                :item-props="
                  (category) => ({
                    value: category.id,
                    title: `${category.emoji} ${category.name}`,
                  })
                "
                class="w-100"
              />
            </div>
          </v-card-item>

          <v-card-actions>
            <v-spacer />
            <v-btn text="Cancelar" @click="isActive.value = false" />
            <v-btn
              variant="flat"
              text="Agregar"
              @click="
                addProduct();
                isActive.value = false;
              "
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<style scoped></style>
