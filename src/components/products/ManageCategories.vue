<script setup lang="ts">
import { storeToRefs } from 'pinia';

import AddCategoryDialog from './AddCategoryDialog.vue';
import ListItem from '@/components/ListItem.vue';
import { useStore } from '@/store/store';

const store = useStore();
const { categories } = storeToRefs(store);
</script>

<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="Administrar Categorías"
        variant="text"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card variant="outlined" class="bg-surface" title="Categorías">
        <v-card-item class="scrolling">
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
          <div v-else>No hay categorías</div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <AddCategoryDialog />
          <v-btn variant="flat" text="Listo" @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.scrolling {
  overflow: auto;
  max-height: 50vh;
}
</style>
