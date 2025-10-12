<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useStore } from '@/store/store';
import type { Item } from '@/schemas/item.schema';

const store = useStore();
const { products } = storeToRefs(store);

const { item, listId } = defineProps<{
  listId: number;
  item?: Item;
}>();

const itemProductId = ref(item?.product.id ?? null);
const itemQuantity = ref(item?.quantity.toString() ?? '1');
const itemUnit = ref(item?.unit ?? '');

const isEditing = item !== undefined;

// TODO cambiar a items
async function commit() {
  if (itemProductId.value === null) return;

  if (isEditing) {
    store.updateListItem(
      listId,
      item.id,
      itemProductId.value,
      Number(itemQuantity.value),
      itemUnit.value ?? '',
    );
  } else {
    store.addListItem(
      listId,
      itemProductId.value,
      Number(itemQuantity.value),
      itemUnit.value ?? '',
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
        :title="`${isEditing ? 'Modificar' : 'Agregar'} item`"
      >
        <v-card-item>
          <div class="d-flex flex-column align-center py-2 ga-4">
            <div class="quantity-unit-field-container">
              <v-text-field
                v-model="itemQuantity"
                label="Cantidad"
                type="number"
                min="1"
              />

              <v-text-field
                v-model="itemUnit"
                label="Unidad (opcional)"
                type="text"
              />
            </div>

            <v-select
              v-model="itemProductId"
              label="Producto"
              :items="products"
              :item-props="
                (product) => ({
                  value: product.id,
                  title: `${product.emoji} ${product.name}`,
                })
              "
              class="select w-100"
            />
          </div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn text="Cancelar" @click="isActive.value = false" />
          <v-btn
            variant="flat"
            :text="isEditing ? 'Guardar cambios' : 'Agregar'"
            :disabled="
              !itemQuantity || !Number(itemQuantity) || itemProductId === null
            "
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

.quantity-unit-field-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.5rem;
}
</style>
