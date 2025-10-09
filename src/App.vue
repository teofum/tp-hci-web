<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { VBtn } from 'vuetify/components';
import { useStore } from './store/store';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const isAuthRoute = computed(() => route.path.startsWith('/auth'));

const store = useStore();
onMounted(() => store.init());
</script>

<template>
  <v-app class="bg-surface">
    <v-container>
      <v-app-bar v-if="!isAuthRoute" style="border-bottom: 1px solid #00000061">
        <template v-slot:prepend>
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="40"
            height="40"
          />
        </template>

        <v-app-bar-title>Shopping list app</v-app-bar-title>

        <template v-slot:append>
          <VBtn @click="router.push('/profile')"> Mi Perfil </VBtn>
        </template>
      </v-app-bar>

      <v-main>
        <RouterView />
      </v-main>
    </v-container>
  </v-app>
</template>
