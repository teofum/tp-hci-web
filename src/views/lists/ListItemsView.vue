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
import AddListDialog from '@/components/lists/AddListDialog.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

const props = defineProps<{ id: string }>();

const router = useRouter();
function goBack() {
  router.push('/lists');
}

const loading = ref(true);
const error = ref<string | null>(null);

const listId = z.coerce.number().parse(props.id);
onMounted(async () => {
  try {
    await store.getListItems(listId, 'createdAt', 'DESC');
  } catch (e) {
    console.error(e);
    error.value = JSON.stringify(e, null, 2);
  } finally {
    loading.value = false;
  }
});

const store = useStore();
const { lists, items } = storeToRefs(store);

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

function togglePurchased(itemId: number, purchased: boolean) {
  store.togglePurchaseListItem(listId, itemId, purchased);
}

function markCompleted() {
  store.purchaseList(listId);
  router.push('/lists');
}
</script>

<template>
  <div class="error" v-if="error">Error: {{ error }}</div>
  <div
    class="loading bg-surface"
    v-else-if="
      loading || filteredItems === null || itemsByCategory === null || !list
    "
  >
    <v-progress-circular indeterminate color="primary" />
  </div>
  <v-container v-else max-width="800" class="container">
    <v-btn @click="goBack" variant="text" prepend-icon="mdi-chevron-left">
      Listas
    </v-btn>
    <div class="d-flex flex-row align-center w-100">
      <h1 class="heading text-high-emphasis mr-auto">{{ list.name }}</h1>
      <v-tooltip
        v-if="
          items[listId].length > 0 && items[listId].every((i) => i.purchased)
        "
        text="Marcar como completada"
        location="top"
      >
        <template v-slot:activator="{ props: tooltipProps }">
          <v-btn
            icon="mdi-check"
            v-bind="tooltipProps"
            variant="text"
            @click="markCompleted"
          />
        </template>
      </v-tooltip>
      <ConfirmationDialog
        v-else-if="items[listId].filter((i) => i.purchased).length > 0"
        title="Completar lista"
        @confirm="markCompleted"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-tooltip text="Marcar como completada" location="top">
            <template v-slot:activator="{ props: tooltipProps }">
              <v-btn
                icon="mdi-check"
                v-bind="{ ...activatorProps, ...tooltipProps }"
                variant="text"
              />
            </template>
          </v-tooltip>
        </template>

        <template v-slot:default>
          <p>
            Esta lista todavía tiene algunos productos sin comprar. ¿Marcarla
            como completada de todos modos?
          </p>
          <p class="mt-3 warning text-error" v-if="!list.recurring">
            Esta operación eliminará la lista de compras permanentemente.
          </p>
          <p class="mt-3 warning" v-else>
            Esta operación volverá la lista a su estado inicial.
          </p>
        </template>
      </ConfirmationDialog>
      <AddListDialog :list="list">
        <template v-slot:activator="{ props: activatorProps }">
          <v-tooltip text="Modificar" location="top">
            <template v-slot:activator="{ props: tooltipProps }">
              <v-btn
                icon="mdi-pencil-outline"
                v-bind="{ ...activatorProps, ...tooltipProps }"
                variant="text"
              />
            </template>
          </v-tooltip>
        </template>
      </AddListDialog>
      <ShareListDialog :list="list">
        <template v-slot:activator="{ props: activatorProps }">
          <v-tooltip text="Compartir" location="top">
            <template v-slot:activator="{ props: tooltipProps }">
              <v-btn
                icon="mdi-share-variant"
                v-bind="{ ...activatorProps, ...tooltipProps }"
                variant="text"
              />
            </template>
          </v-tooltip>
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
            :detail="`${item.quantity} ${item.unit}`"
            :purchased="item.purchased"
          >
            <div class="d-flex justify-space-between align-center">
              <v-checkbox-btn
                :model-value="item.purchased"
                @update:model-value="togglePurchased(item.id, !item.purchased)"
              />
              <v-menu>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    variant="text"
                    icon="mdi-dots-vertical"
                  />
                </template>

                <v-list>
                  <AddItemDialog :list-id="listId" :item="item">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-list-item
                        v-bind="activatorProps"
                        prepend-icon="mdi-pencil-outline"
                        title="Modificar"
                      />
                    </template>
                  </AddItemDialog>
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
          :detail="`${item.quantity} ${item.unit}`"
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
                <AddItemDialog :list-id="listId" :item="item">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-list-item
                      v-bind="activatorProps"
                      prepend-icon="mdi-pencil-outline"
                      title="Modificar"
                    />
                  </template>
                </AddItemDialog>
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

    <AddItemDialog :list-id="listId">
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          app
          location="bottom end"
          size="x-large"
          text="Agregar producto"
          prepend-icon="mdi-plus"
          variant="flat"
        />
      </template>
    </AddItemDialog>
  </v-container>
</template>

<style>
.error {
  width: 100%;
  padding-top: 8rem;
  display: grid;
  place-items: center;
}

.loading {
  width: 100%;
  padding-top: 8rem;
  display: grid;
  place-items: center;
}

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

.warning {
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
