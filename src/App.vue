<script setup lang="ts"></script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar class="bg-red">
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
