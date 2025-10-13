<script setup lang="ts">
import { ref } from 'vue';

import ActionWithToast from '@/components/ActionWithToast.vue';
import EmojiPickerButton from '@/components/EmojiPickerButton.vue';
import { useStore } from '@/store/store';
import type { Category } from '@/schemas/product.schema';

const store = useStore();

const { category } = defineProps<{
  category?: Category;
}>();

const categoryName = ref(category?.name ?? '');
const categoryEmoji = ref(category?.emoji ?? '📦');

const isEditing = category !== undefined;

async function commit() {
  if (isEditing) {
    await store.modifyCategory(
      category.id,
      categoryName.value,
      categoryEmoji.value,
    );
  } else {
    await store.addCategory(categoryName.value, categoryEmoji.value);
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
        :title="`${isEditing ? 'Modificar' : 'Agregar'} categoría`"
      >
        <v-card-item>
          <div class="d-flex flex-column align-center py-2 ga-4">
            <EmojiPickerButton v-model="categoryEmoji" />

            <v-text-field
              v-model="categoryName"
              label="Nombre"
              type="text"
              class="w-100"
            />
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
                :disabled="!categoryName"
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
