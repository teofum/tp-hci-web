<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VBtn } from 'vuetify/components';

import { useStore } from './store/store';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const isAuthRoute = computed(() => route.path.startsWith('/auth'));

const store = useStore();
const { user } = storeToRefs(store);

const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    if (!isAuthRoute.value) await store.init();
  } catch (e) {
    if (e instanceof Error && e.message === 'Invalid authorization') {
      router.push('/auth/signin');
    } else {
      console.error(e);
      error.value = JSON.stringify(e, null, 2);
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-app class="bg-surface">
    <v-container>
      <v-app-bar v-if="!isAuthRoute" style="border-bottom: 1px solid #00000061">
        <template v-slot:prepend>
          <div class="d-flex flex-row align-center pl-4">
            <div class="bar-icon-box bg-secondary mr-2">
              <v-icon icon="mdi-shopping-outline" size="24" color="white" />
            </div>
            <v-btn to="/lists" text="Listas" />
            <v-btn to="/history" text="Historial" />
            <v-btn to="/products" text="Productos" />
          </div>
        </template>

        <template v-slot:append>
          <div class="d-flex flex-row ga-2 align-center pr-4">
            <div>Hola, {{ user?.name }}!</div>
            <v-btn to="/profile" text="Perfil" />
          </div>
        </template>
      </v-app-bar>

      <v-main>
        <div class="loading bg-surface" v-if="loading">
          <v-progress-circular indeterminate color="primary" />
        </div>
        <div v-else-if="error">Error: {{ error }}</div>
        <RouterView v-else />
      </v-main>
    </v-container>
  </v-app>
</template>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
.bar-icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
}
</style>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300..700&display=swap');
$body-font-family: 'Spline Sans';
$heading-font-family: 'Spline Sans';
#app,
:root {
  font-family: $body-font-family, sans-serif !important;
}
</style>
