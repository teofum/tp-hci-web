<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { VBtn } from 'vuetify/components';

import { useSetup } from '@/composables/useSetup';
import { useStore } from '@/store/store';

const route = useRoute();
const isAuthRoute = computed(() => route.path.startsWith('/auth'));

const store = useStore();
const { user } = storeToRefs(store);
const { loading, error } = useSetup(async () => {
  if (!isAuthRoute.value) await store.init();
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
          <div v-if="user" class="d-flex flex-row ga-2 align-center pr-4">
            <div>Hola, {{ user.name }}!</div>
            <v-btn to="/profile" text="Perfil" />
          </div>
        </template>
      </v-app-bar>

      <v-main>
        <div class="loading bg-surface" v-if="loading">
          <v-progress-circular indeterminate color="primary" />
        </div>
        <v-card variant="tonal" class="error" v-else-if="error">
          <div class="heading">Algo salió mal</div>
          <p class="description">Ocurrió un error inesperado.</p>
        </v-card>
        <RouterView v-else />
      </v-main>
    </v-container>
  </v-app>
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
