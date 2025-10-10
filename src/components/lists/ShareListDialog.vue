<script setup lang="ts">
import { ref } from 'vue';
import EmojiPickerButton from '@/components/EmojiPickerButton.vue';
import { useStore } from '@/store/store';
import type { List } from '@/schemas/list.schema';

const store = useStore();

const shareUsername = ref('');

async function shareCommit() {} // TODO
</script>

<template>
  
  <v-dialog max-width="600">

        <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>

        <template v-slot:default="{ isActive }">
      <v-card
        variant="outlined"
        class="bg-surface"
        :title="'Compartir lista'"
      >
        <v-card-item>
          <div class="d-flex flex-column align-center py-2 ga-4">
            <v-text-field
              v-model="shareUsername"
              label="Buscar usuarios"
              type="text"
              class="w-100"
            />
          </div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="flat"
            :text="'Compartir'"
            @click="
              shareCommit();
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
