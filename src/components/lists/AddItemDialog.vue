<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

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
    store.modifyProduct(
      product.id,
      productName.value,
      productEmoji.value,
      productCategory.value ?? null,
    );
  } else {
    store.addProduct(
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

          </div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn text="Cancelar" @click="isActive.value = false" />
          <v-btn
            variant="flat"
            :text="isEditing ? 'Guardar cambios' : 'Agregar'"
            :disabled="!productName"
            @click="
              commit();
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
