<script setup lang="ts">
const {
  title,
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
  danger = false,
} = defineProps<{
  title: string;
  cancelText?: string;
  confirmText?: string;
  danger?: boolean;
}>();

const emit = defineEmits<{
  cancel: [];
  confirm: [];
}>();
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card variant="outlined" class="bg-surface" :title="title">
        <v-card-item>
          <slot />
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn
            :text="cancelText"
            @click="
              emit('cancel');
              isActive.value = false;
            "
          />
          <v-btn
            variant="flat"
            :color="danger ? 'error' : 'primary'"
            :text="confirmText"
            @click="
              emit('confirm');
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

.quantity-unit-field-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.5rem;
}
</style>
