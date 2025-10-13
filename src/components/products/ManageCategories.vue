<script setup lang="ts">
import { storeToRefs } from 'pinia';

import AddCategoryDialog from './AddCategoryDialog.vue';
import ListItem from '@/components/ListItem.vue';
import { useStore } from '@/store/store';
import type { Category } from '@/schemas/product.schema';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

const store = useStore();
const { categories, products } = storeToRefs(store);

function productsInCategory(category: Category) {
  return products.value.filter((p) => p.category?.id === category.id).length;
}
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
              :detail="`${productsInCategory(category)} productos`"
            >
              <v-menu>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    variant="text"
                    icon="mdi-dots-vertical"
                  />
                </template>

                <v-list>
                  <AddCategoryDialog :category="category">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-list-item
                        v-bind="activatorProps"
                        prepend-icon="mdi-pencil-outline"
                        title="Modificar"
                      />
                    </template>
                  </AddCategoryDialog>
                  <ConfirmationDialog
                    title="Eliminar categoría"
                    danger
                    @confirm="store.deleteCategory(category.id)"
                  >
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-list-item
                        v-bind="activatorProps"
                        class="text-red"
                        prepend-icon="mdi-delete-outline"
                        title="Eliminar"
                      />
                    </template>

                    <template v-slot:default>
                      <p>
                        ¿Eliminar {{ category.name }}? Todos los productos con
                        esta categoría permanecerán, pero sin categoría.
                      </p>
                      <p class="mt-3 warning text-error">
                        Esta operación no se puede deshacer
                      </p>
                    </template>
                  </ConfirmationDialog>
                </v-list>
              </v-menu>
            </ListItem>
          </ul>

          <v-card variant="tonal" class="placeholder" v-else>
            <div class="title">No hay categorías</div>

            <AddCategoryDialog>
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  text="Agregar categoría"
                  prepend-icon="mdi-plus"
                  variant="flat"
                />
              </template>
            </AddCategoryDialog>
          </v-card>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <AddCategoryDialog>
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                text="Agregar categoría"
                prepend-icon="mdi-plus"
                variant="flat"
              />
            </template>
          </AddCategoryDialog>
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

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 4rem;

  .title {
    font-size: 2rem;
    font-weight: 700;
  }
}
</style>
