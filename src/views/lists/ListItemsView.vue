<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import z from 'zod';

import { useStore } from '@/store/store';
import AddItemDialog from '@/components/lists/AddItemDialog.vue';
import ListItem from '@/components/ListItem.vue';
import ShareListDialog from '@/components/lists/ShareListDialog.vue';
import AddListDialog from '@/components/lists/AddListDialog.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import ListWithGrouping from '@/components/ListWithGrouping.vue';
import { useSetup } from '@/composables/useSetup';
import { APIError } from '@/api/error';

const props = defineProps<{ id: string }>();

const router = useRouter();
function goBack() {
  router.push('/lists');
}

const listId = z.coerce.number().parse(props.id);
const { loading, error } = useSetup(
  async () => await store.getListItems(listId, 'createdAt', 'DESC'),
  (e) => {
    if (e instanceof APIError) {
      return { status: e.statusCode, detail: e.status };
    } else {
      return { status: -1, detail: 'Unknown error' };
    }
  },
);

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
  <v-card variant="tonal" class="error" v-if="error">
    <div class="heading">Algo salió mal</div>
    <p class="description" v-if="error.status === 404">
      No se encontró esta lista.
    </p>
    <p class="description" v-else>Ocurrió un error inesperado.</p>
    <v-btn
      to="/lists"
      variant="flat"
      prepend-icon="mdi-arrow-left"
      text="Volver a listas"
      class="mt-8"
    />
  </v-card>
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
        hide-details
      />
      <v-switch
        v-model="groupByCategory"
        label="Agrupar por categoría"
        inset
        color="primary"
        class="switch"
      />
    </div>

    <ListWithGrouping
      :group="groupByCategory"
      :grouped-items="itemsByCategory"
      :all-items="filteredItems"
    >
      <template v-slot="{ item }">
        <ListItem
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
                <ConfirmationDialog
                  title="Eliminar producto"
                  danger
                  @confirm="store.deleteListItem(listId, item.id)"
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
                    <p>¿Eliminar {{ item.product.name }}?</p>
                    <p class="mt-3 warning text-error">
                      Esta operación no se puede deshacer
                    </p>
                  </template>
                </ConfirmationDialog>
              </v-list>
            </v-menu>
          </div>
        </ListItem>
      </template>
    </ListWithGrouping>

    <v-card
      variant="tonal"
      class="placeholder"
      v-if="filteredItems.length === 0"
    >
      <div class="title">No hay productos</div>

      <AddItemDialog :list-id="listId">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            text="Agregar producto"
            prepend-icon="mdi-plus"
            variant="flat"
          />
        </template>
      </AddItemDialog>
    </v-card>

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

<style scoped>
.error {
  width: 100%;
  margin-top: 8rem;
  padding: 3rem;
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

.warning {
  font-size: 0.875rem;
  font-weight: 600;
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

<style>
.switch {
  .v-selection-control {
    flex-direction: row-reverse !important;

    .v-label {
      padding-inline-start: 0;
      padding-inline-end: 10px;
    }
  }
}
</style>
