<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';
import AddItemDialog from '@/components/lists/AddItemDialog.vue';
import ListItem from '@/components/ListItem.vue';
import ShareListDialog from '@/components/lists/ShareListDialog.vue';
import z from 'zod';
import { onMounted } from 'vue';

const props = defineProps<{ id: string }>();

const router = useRouter();
function goBack() {
  router.push('/');
}

const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    await store.getListItems(listId, 'createdAt', 'DESC');
  } catch (e) {
    error.value = JSON.stringify(e);
  } finally {
    loading.value = false;
  }
});

const store = useStore();
const { lists, items } = storeToRefs(store);

const listId = z.coerce.number().parse(props.id);

const list = computed(() => lists.value.find((l) => l.id === listId));

const filter = ref('');
const groupByCategory = ref(true);

const filteredItems = computed(() => {
  if (!items.value[listId]) return null;

  return items.value[listId].filter(
    (item) =>
      !filter.value ||
      item.product.name.toLowerCase().includes(filter.value.toLowerCase()),
  );
});

const itemsByCategory = computed(() => {
  if (!filteredItems.value) return null;

  const categories: Record<number, [string, (typeof items.value)[number]]> = {};
  for (const item of filteredItems.value) {
    const catId = item.product.category?.id ?? -1;

    if (!categories[catId]) {
      const catName = item.product.category?.name ?? 'Sin categoría';
      categories[catId] = [catName, []];
    }

    categories[catId][1].push(item);
  }

  return categories;
});
</script>

<template>
  <div v-if="loading || filteredItems === null || itemsByCategory === null">
    Loading...
  </div>
  <div v-else-if="error !== null">Error: {{ error }}</div>
  <v-container v-else max-width="800" class="container">
    <v-btn @click="goBack" variant="text" prepend-icon="mdi-chevron-left">
      Listas
    </v-btn>
    <div class="d-flex flex-row justify-space-between align-center w-100">
      <h1 class="heading text-high-emphasis">{{ list?.name }}</h1>
      <ShareListDialog>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" variant="text">
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </template>
      </ShareListDialog>
    </div>
    <div class="d-flex flex-column ga-2 my-4">
      <v-text-field
        v-model="filter"
        label="Buscar"
        type="text"
        class="w-100"
        clearable
        clear-icon="mdi-close-circle-outline"
      />
    </div>

    <div class="d-flex justify-space-between">
      <v-select
        :items="['Fecha', 'Items']"
        label="Ordenar por"
        style="max-width: 160px"
      ></v-select>
      <v-switch
        v-model="groupByCategory"
        label="Agrupar por categoría"
        inset
        color="primary"
        class="switch"
      />
    </div>
    <div v-if="groupByCategory">
      <div
        v-for="[key, [categoryName, items]] in Object.entries(itemsByCategory)"
        :key="key"
      >
        <h2 class="text-medium-emphasis mt-3 category-heading">
          {{ categoryName }}
        </h2>

        <ul>
          <ListItem
            v-for="item in items"
            :key="item.id"
            :name="item.product.name"
            :emoji="item.product.emoji"
            :detail="item.product.category?.name ?? 'Sin categoría'"
          >
            <div class="d-flex justify-space-between">
              <v-checkbox-btn></v-checkbox-btn>
              <v-menu>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    variant="text"
                    icon="mdi-dots-vertical"
                  />
                </template>

                <v-list>
                  <AddProductDialog :product="item.product">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-list-item
                        v-bind="activatorProps"
                        prepend-icon="mdi-pencil-outline"
                        title="Modificar"
                      />
                    </template>
                  </AddProductDialog>
                  <v-list-item
                    class="text-red"
                    prepend-icon="mdi-delete-outline"
                    title="Eliminar"
                    @click="store.deleteListItem(listId, item.id)"
                  />
                </v-list>
              </v-menu>
            </div>
          </ListItem>
        </ul>
      </div>
    </div>
    <div v-else>
      <ul>
        <ListItem
          v-for="item in filteredItems"
          :key="item.id"
          :name="item.product.name"
          :emoji="item.product.emoji"
          :detail="item.product.category?.name ?? 'Sin categoría'"
        >
          <div class="d-flex justify-space-between">
            <v-checkbox-btn></v-checkbox-btn>
            <v-menu>
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="text"
                  icon="mdi-dots-vertical"
                />
              </template>

              <v-list>
                <AddProductDialog :product="item.product">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-list-item
                      v-bind="activatorProps"
                      prepend-icon="mdi-pencil-outline"
                      title="Modificar"
                    />
                  </template>
                </AddProductDialog>
                <v-list-item
                  class="text-red"
                  prepend-icon="mdi-delete-outline"
                  title="Eliminar"
                  @click="store.deleteListItem(listId, item.id)"
                />
              </v-list>
            </v-menu>
          </div>
        </ListItem>
      </ul>
    </div>

    <div
      v-if="
        Object.keys(itemsByCategory).length === 0 || filteredItems.length === 0
      "
    >
      No hay items
    </div>

    <AddItemDialog>
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          app
          location="bottom end"
          size="x-large"
          text="Agregar item"
          prepend-icon="mdi-plus"
          variant="flat"
        />
      </template>
    </AddItemDialog>
  </v-container>
</template>

<style>
.heading {
  font-size: 3rem;
  font-weight: 700;
}

.category-heading {
  font-size: 1.5rem;
  font-weight: 700;
}
.switch {
  .v-selection-control {
    flex-direction: row-reverse;

    .v-label {
      padding-inline-start: 0;
      padding-inline-end: 10px;
    }
  }
}
</style>
