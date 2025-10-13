<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import ListItem from '@/components/ListItem.vue';
import ListWithGrouping from '@/components/ListWithGrouping.vue';
import { useSetup } from '@/composables/useSetup';
import { useStore } from '@/store/store';
import type { Purchase } from '@/schemas/purchases.schema';

const PERIOD_NAME = {
  day: 'Hoy',
  week: 'Última semana',
  month: 'Último mes',
  older: 'Hace mucho tiempo',
} as const;

const router = useRouter();
const store = useStore();
const { history, products } = storeToRefs(store);

const { loading, error } = useSetup(async () => {
  await store.getPurchases();
});

const groupByTimePeriod = ref(true);
const filter = ref('');
const orderBy = ref<'date' | 'name'>('date');
const filterBy = ref<'day' | 'week' | 'month' | 'all'>('all');

function getTimePeriod(date: Date): keyof typeof PERIOD_NAME {
  const now = new Date();
  const diffMillis = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMillis / (24 * 60 * 60 * 1000));

  if (diffDays < 1) return 'day';
  if (diffDays < 7) return 'week';
  if (diffDays < 30) return 'month';
  return 'older';
}

function purchaseVisible(
  period: keyof typeof PERIOD_NAME,
  periodFilter: typeof filterBy.value,
) {
  switch (periodFilter) {
    case 'all':
      return true;
    case 'month':
      return period !== 'older';
    case 'week':
      return period === 'day' || period === 'week';
    case 'day':
      return period === 'day';
  }
}

const filteredPurchases = computed(() => {
  const filtered = history.value
    .filter(
      (purchase) =>
        !filter.value ||
        purchase.list.name.toLowerCase().includes(filter.value.toLowerCase()),
    )
    .filter((purchase) =>
      purchaseVisible(
        getTimePeriod(new Date(purchase.createdAt)),
        filterBy.value,
      ),
    );
  filtered.sort((a, b) =>
    orderBy.value === 'date'
      ? a.createdAt > b.createdAt
        ? -1
        : 1
      : a.list.name > b.list.name
        ? -1
        : 1,
  );

  return filtered;
});

const purchasesByTimePeriod = computed(() => {
  const periods: Record<string, [string, typeof history.value]> = {};
  for (const purchase of filteredPurchases.value) {
    const periodId = getTimePeriod(new Date(purchase.createdAt));
    if (!periods[periodId]) {
      const periodName = PERIOD_NAME[periodId];
      periods[periodId] = [periodName, []];
    }

    periods[periodId][1].push(purchase);
  }

  return periods;
});

function getDetailLine(purchase: Purchase) {
  return `${purchase.items.length} producto${purchase.items.length === 1 ? '' : 's'} — ${new Date(purchase.createdAt).toLocaleDateString('es-ar')}`;
}

function viewDetail(id: number) {
  router.push({ name: 'history-detail', params: { id } });
}

async function restorePurchasedList(id: number) {
  await store.restorePurchase(id);
  router.push({ name: 'lists' });
}
</script>

<template>
  <div class="error" v-if="error">Error: {{ error }}</div>
  <div class="loading bg-surface" v-else-if="loading">
    <v-progress-circular indeterminate color="primary" />
  </div>
  <v-container v-else max-width="800" class="container">
    <div class="d-flex flex-row justify-space-between align-center w-100">
      <h1 class="heading text-high-emphasis">Historial</h1>
    </div>

    <div class="d-flex flex-column ga-3 my-4">
      <v-text-field
        v-model="filter"
        label="Buscar"
        type="text"
        class="w-100"
        clearable
        clear-icon="mdi-close-circle-outline"
        hide-details
      />

      <div class="d-flex ga-4">
        <v-select
          v-model="orderBy"
          :items="[
            { title: 'Fecha', value: 'date' },
            { title: 'Nombre', value: 'name' },
          ]"
          label="Ordenar por"
          style="max-width: 160px"
        >
        </v-select>
        <v-select
          v-model="filterBy"
          :items="[
            { title: 'Hoy', value: 'day' },
            { title: 'Última semana', value: 'week' },
            { title: 'Último mes', value: 'month' },
            { title: 'Todo', value: 'all' },
          ]"
          label="Ver"
          style="max-width: 160px"
        />
        <v-switch
          v-model="groupByTimePeriod"
          label="Agrupar por período"
          inset
          color="primary"
          class="switch ml-auto"
        />
      </div>
    </div>

    <ListWithGrouping
      :group="groupByTimePeriod"
      :grouped-items="purchasesByTimePeriod"
      :all-items="filteredPurchases"
    >
      <template v-slot="{ item: purchase }">
        <ListItem
          :key="purchase.id"
          :name="purchase.list.name"
          :emoji="purchase.list.emoji"
          :detail="getDetailLine(purchase)"
          @click="viewDetail(purchase.id)"
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
              <v-list-item
                :disabled="
                  purchase.list.recurring ||
                  !purchase.items.every((i) =>
                    products.find((p) => p.id === i.product.id),
                  )
                "
                prepend-icon="mdi-reload"
                title="Repetir lista"
                @click="restorePurchasedList(purchase.id)"
              />
            </v-list>
          </v-menu>
        </ListItem>
      </template>
    </ListWithGrouping>

    <v-card
      variant="tonal"
      class="placeholder"
      v-if="filteredPurchases.length === 0"
    >
      <div class="title">No hay compras</div>

      <v-btn
        v-if="filter || filterBy !== 'all'"
        @click="
          filter = '';
          filterBy = 'all';
        "
        text="Limpiar filtros"
        append-icon="mdi-close"
        variant="flat"
      />
      <v-btn
        v-else
        to="/lists"
        text="Ir a listas"
        append-icon="mdi-arrow-right"
        variant="flat"
      />
    </v-card>

    <AddListDialog>
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          app
          location="bottom end"
          size="x-large"
          text="Agregar lista"
          prepend-icon="mdi-plus"
          variant="flat"
        />
      </template>
    </AddListDialog>
  </v-container>
</template>

<style scoped>
.heading {
  font-size: 3rem;
  font-weight: 700;
}

.category-heading {
  font-size: 1.5rem;
  font-weight: 700;
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
