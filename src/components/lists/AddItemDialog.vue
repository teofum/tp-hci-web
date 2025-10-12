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

// TODO esto cambiarlo a items
// hardcodeado con products para debug
const itemName = ref(product?.name ?? '');
const itemEmoji = ref(product?.emoji ?? '📦');
const itemQuantity = ref(product?.name ?? '');
const itemPrice = ref(product?.name ?? '');
const itemCategory = ref(product?.category?.id);

const isEditing = product !== undefined;

// TODO cambiar a items
async function commit() {
  if (isEditing) {
    //   store.modifyItem(
    //     product.id,
    //     itemName.value,
    //     itemEmoji.value,
    //     itemQuantity.value,
    //     itemPrice.value,
    //     itemCategory.value ?? null,
    //   );
    // } else {
    //   store.addProduct(
    //     product.id,
    //     itemName.value,
    //     itemEmoji.value,
    //     itemQuantity.value,
    //     itemPrice.value,
    //     itemCategory.value ?? null,
    //   );
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
        :title="`${isEditing ? 'Modificar' : 'Agregar'} item`"
      >
        <v-card-item>
          <div class="d-flex flex-column align-center py-2 ga-4">
            <EmojiPickerButton v-model="itemEmoji" />

            <v-text-field
              v-model="itemName"
              label="Nombre"
              type="text"
              class="w-100"
            />
          </div>
        </v-card-item>

        <v-card-subtitle>Detalles</v-card-subtitle>

        <v-card-item>
          <div class="d-flex flex-column ga-4">
            <v-text-field
              v-model="itemQuantity"
              label="Cantidad (unidades, kg, etc)"
              type="number"
              class="w-100"
            />

            <v-text-field
              v-model="itemPrice"
              label="Precio"
              type="text"
              class="w-100"
            />

            <v-select
              v-model="itemCategory"
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
          </div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn text="Cancelar" @click="isActive.value = false" />
          <v-btn
            variant="flat"
            :text="isEditing ? 'Guardar cambios' : 'Agregar'"
            :disabled="!itemName"
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
