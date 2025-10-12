<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import z from 'zod';

import ListItem from '@/components/ListItem.vue';
import { useSetup } from '@/composables/useSetup';
import { useStore } from '@/store/store';

const props = defineProps<{ id: string }>();

const router = useRouter();
function goBack() {
  router.push('/history');
}

const store = useStore();
const { history, products } = storeToRefs(store);

const purchaseId = z.coerce.number().parse(props.id);
const { loading, error } = useSetup(async () => {
  if (!history.value.find((p) => p.id === purchaseId))
    await store.getPurchases();
});

const purchase = computed(() => history.value.find((p) => p.id === purchaseId));

async function restorePurchasedList() {
  await store.restorePurchase(purchaseId);
  router.push({ name: 'lists' });
}
</script>

<template>
  <div class="error" v-if="error">Error: {{ error }}</div>
  <div class="loading bg-surface" v-else-if="loading || !purchase">
    <v-progress-circular indeterminate color="primary" />
  </div>
  <v-container v-else max-width="800" class="container">
    <v-btn @click="goBack" variant="text" prepend-icon="mdi-chevron-left">
      Historial
    </v-btn>
    <div class="d-flex flex-row align-center w-100">
      <h1 class="heading text-high-emphasis mr-auto">
        {{ purchase.list.name }}
      </h1>
      <v-tooltip
        v-if="
          !purchase.list.recurring &&
          purchase.items.every((i) =>
            products.find((p) => p.id === i.product.id),
          )
        "
        text="Repetir lista"
        location="top"
      >
        <template v-slot:activator="{ props: tooltipProps }">
          <v-btn
            icon="mdi-reload"
            v-bind="tooltipProps"
            variant="text"
            @click="restorePurchasedList()"
          />
        </template>
      </v-tooltip>
    </div>

    <div class="d-flex flex-row ga-2 w-100">
      <v-chip>
        Comprada
        {{ new Date(purchase.createdAt).toLocaleDateString('es-ar') }}
      </v-chip>
      <v-chip v-if="purchase.list.recurring" color="success">
        Recurrente
      </v-chip>
    </div>

    <h2 class="text-medium-emphasis mt-3 category-heading">Productos</h2>
    <div>
      <ul>
        <ListItem
          v-for="item in purchase.items"
          :key="item.id"
          :name="item.product.name"
          :emoji="item.product.emoji"
          :detail="`${item.quantity} ${item.unit}`"
        />
      </ul>
    </div>
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
</style>
