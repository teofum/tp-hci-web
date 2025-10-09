<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import ListItem from '@/components/ListItem.vue';
import EmojiPickerButton from '@/components/EmojiPickerButton.vue';
import { useStore } from '@/store/store';

const store = useStore();
const { categories } = storeToRefs(store);

const categoryName = ref('');
const categoryEmoji = ref('📦');

async function addCategory() {
  store.addCategory(categoryName.value, categoryEmoji.value);
}
</script>

<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="Categorías" variant="text" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card variant="outlined" class="bg-surface" title="Agregar categoría">
        <v-card-item>
          <ul v-if="categories.length">
            <ListItem
              v-for="category in categories"
              :key="category.id"
              :name="category.name"
              :emoji="category.emoji"
              :detail="`N items`"
            >
            </ListItem>
          </ul>
          <div v-else>no categories</div>
        </v-card-item>

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
            <v-card
              variant="outlined"
              class="bg-surface"
              title="Agregar categoría"
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
