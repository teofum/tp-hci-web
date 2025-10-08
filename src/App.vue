<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isAuthRoute = computed(() => route.path.startsWith('/auth'));
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar v-if="!isAuthRoute" class="bg-red">
        <template v-slot:prepend>
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="40"
            height="40"
          />
        </template>

        <v-app-bar-title>asdfasdf</v-app-bar-title>
      </v-app-bar>

      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>
