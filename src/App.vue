<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { VBtn } from 'vuetify/components';

const route = useRoute();
const router = useRouter();
const isAuthRoute = computed(() => route.path.startsWith('/auth'));
</script>

<template>
  <v-app>
    <v-layout class="bg-surface">
      <v-app-bar
        v-if="!isAuthRoute"
        elevation="0"
        color="#EFEFE9"
        style="border-bottom: 2px solid #00000061"
      >
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
    </v-layout>
  </v-app>
</template>
