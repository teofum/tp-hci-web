<script setup lang="ts">
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

const model = defineModel<string>();
</script>

<template>
  <v-menu :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        :text="model"
        variant="tonal"
        :style="{ fontSize: '48px !important' }"
        size="80"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <emoji-picker
        :native="true"
        @select="
          (emoji) => {
            isActive.value = false;
            model = emoji.i;
          }
        "
      />
    </template>
  </v-menu>
</template>
