<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import AddCategoryDialog from './AddCategoryDialog.vue';
import EmojiPickerButton from '@/components/EmojiPickerButton.vue';
import { useStore } from '@/store/store';

const store = useStore();
const { categories } = storeToRefs(store);

const productName = ref('');
const productEmoji = ref('📦');
const productCategory = ref<number>();

async function addProduct() {
  store.addProduct(
    productName.value,
    productEmoji.value,
    productCategory.value ?? 0,
  );
}
</script>

<template>
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

            <div class="d-flex flex-row align-center ga-4 w-100">
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
                class="select"
              />
              <AddCategoryDialog />
            </div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn text="Cancelar" @click="isActive.value = false" />
          <v-btn
            variant="flat"
            text="Agregar"
            :disabled="!productCategory || !productName"
            @click="
              addProduct();
              isActive.value = false;
            "
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.select {
  flex-grow: 1;
}
</style>
