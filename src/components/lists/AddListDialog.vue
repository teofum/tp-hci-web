<script setup lang="ts">
import { ref } from 'vue';
import EmojiPickerButton from '@/components/EmojiPickerButton.vue';
import { useStore } from '@/store/store';
import type { List } from '@/schemas/list.schema';

const store = useStore();

const { list } = defineProps<{
  list?: List;
}>();

const listName = ref(list?.name ?? '');
const listDescription = ref(list?.description ?? '');
const listEmoji = ref(list?.emoji ?? '📝');
const listRecurring = ref(list?.recurring ?? false);

const isEditing = list !== undefined;

async function commit() {
  if (isEditing && list) {
    await store.modifyList(
      list.id,
      listName.value,
      listDescription.value,
      listRecurring.value,
      listEmoji.value,
    );
  } else {
    await store.addList(
      listName.value,
      listDescription.value,
      listRecurring.value,
      listEmoji.value,
    );
  }
}
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
        :title="`${isEditing ? 'Modificar' : 'Agregar'} producto`"
      >
        <v-card-item>
          <div class="d-flex flex-column align-center py-2 ga-4">
            <EmojiPickerButton v-model="listEmoji" />

            <v-text-field
              v-model="listName"
              label="Nombre"
              type="text"
              class="w-100"
            />

            <v-text-field
              v-model="listDescription"
              label="Descripción"
              type="text"
              class="w-100"
            />

            <!-- TODO recurring no sé para qué sirve (ver consignas) -->
            <v-switch
              v-model="listRecurring"
              label="Recurrente"
              inset
              color="primary"
            />

          </div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn text="Cancelar" @click="isActive.value = false" />
          <v-btn
            variant="flat"
            :text="isEditing ? 'Guardar cambios' : 'Agregar'"
            :disabled="!listName"
            @click="
              commit();
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
