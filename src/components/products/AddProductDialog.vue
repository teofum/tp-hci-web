<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import ActionWithToast from '@/components/ActionWithToast.vue';
import AddCategoryDialog from './AddCategoryDialog.vue';
import EmojiPickerButton from '@/components/EmojiPickerButton.vue';
import { useStore } from '@/store/store';
import type { Product } from '@/schemas/product.schema';

const store = useStore();
const { categories } = storeToRefs(store);

const { product } = defineProps<{
  product?: Product;
}>();

const productName = ref(product?.name ?? '');
const productEmoji = ref(product?.emoji ?? '📦');
const productCategory = ref(product?.category?.id);

const isEditing = product !== undefined;

async function commit() {
  if (isEditing) {
    await store.modifyProduct(
      product.id,
      productName.value,
      productEmoji.value,
      productCategory.value ?? null,
    );
  } else {
    await store.addProduct(
      productName.value,
      productEmoji.value,
      productCategory.value ?? null,
    );
  }
}
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        variant="outlined"
        class="bg-surface"
        :title="`${isEditing ? 'Modificar' : 'Agregar'} producto`"
      >
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
              <AddCategoryDialog>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    text="Nueva categoría"
                    prepend-icon="mdi-plus"
                    variant="flat"
                  />
                </template>
              </AddCategoryDialog>
            </div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn text="Cancelar" @click="isActive.value = false" />
          <ActionWithToast
            :action="
              async () => {
                await commit();
                isActive.value = false;
              }
            "
          >
            <template v-slot:trigger="{ props, clickHandler }">
              <v-btn
                variant="flat"
                :text="isEditing ? 'Guardar cambios' : 'Agregar'"
                :disabled="!productName"
                v-bind="props"
                @click="clickHandler"
              />
            </template>
          </ActionWithToast>
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
