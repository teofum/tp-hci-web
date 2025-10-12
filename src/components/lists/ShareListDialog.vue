<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store/store';
import z from 'zod';

const { listId } = defineProps<{
  listId: number;
}>();

const store = useStore();

const shareEmail = ref('');

async function share() {
  store.shareList(listId, shareEmail.value);
}
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card variant="outlined" class="bg-surface" :title="'Compartir lista'">
        <v-card-subtitle>Usuarios compartidos</v-card-subtitle>

        <v-card-item>
          <div>TODO...</div>
        </v-card-item>

        <v-card-subtitle>Compartir</v-card-subtitle>

        <v-card-item>
          <div class="d-flex flex-column align-center py-2 ga-4">
            <v-text-field
              v-model="shareEmail"
              label="Correo electrónico"
              type="email"
              class="w-100"
            />
          </div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="flat"
            text="Compartir"
            :disabled="!shareEmail || !z.email().safeParse(shareEmail).success"
            @click="
              share();
              isActive.value = false;
            "
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.select {
  flex-grow: 1;
}
</style>
