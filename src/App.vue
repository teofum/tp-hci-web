<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { VBtn } from 'vuetify/components';
import { useStore } from './store/store';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const isAuthRoute = computed(() => route.path.startsWith('/auth'));

const store = useStore();

const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    if (!isAuthRoute.value) await store.init();
  } catch (e) {
    console.error(e);
    error.value = JSON.stringify(e, null, 2);
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
          <div class="bar-icon-box">
            <v-icon icon="mdi-shopping-outline" size="32" color="white" />
          </div>
          <VBtn @click="router.push('/lists')"> Listas </VBtn>
          <VBtn @click="router.push('/history')"> Historial </VBtn>
          <VBtn @click="router.push('/products')"> Productos </VBtn>
        </template>

        <template v-slot:append>
          <VBtn @click="router.push('/profile')"> Mi Perfil </VBtn>
        </template>
      </v-app-bar>

      <v-main>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <RouterView v-else />
      </v-main>
    </v-container>
  </v-app>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300..700&display=swap');
$body-font-family: 'Spline Sans';
$heading-font-family: 'Spline Sans';
#app,
:root {
  font-family: $body-font-family, sans-serif !important;
}
.bar-icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background-color: #714e4a;
  border-radius: 12px;
  margin-bottom: 16px;
  transform: translateY(7px);
}
</style>
