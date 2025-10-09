<script setup lang="ts">
import { ref } from 'vue';

import EmojiPickerButton from '@/components/EmojiPickerButton.vue';
import { useStore } from '@/store/store';

const store = useStore();

const categoryName = ref('');
const categoryEmoji = ref('📦');

async function addCategory() {
  store.addCategory(categoryName.value, categoryEmoji.value);
}
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="Agregar categoría"
        prepend-icon="mdi-plus"
        variant="flat"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card variant="outlined" class="bg-surface" title="Agregar categoría">
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
          <v-btn
            variant="flat"
            text="Agregar"
            @click="
              async () => {
                await addCategory();
                isActive.value = false;
              }
            "
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
