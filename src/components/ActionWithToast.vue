<script setup lang="ts">
import { AuthError } from '@/api/error';
import { defineProps, defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';

const { action, errorMessage = 'Ocurrió un error' } = defineProps<{
  action: () => void | Promise<void>;
  errorMessage?: string | ((e: unknown) => string);
}>();

const emit = defineEmits<{
  complete: [];
}>();

const router = useRouter();

const pending = ref(false);
const toast = ref(false);
const error = ref('');

async function clickHandler() {
  pending.value = true;
  try {
    await action();
    emit('complete');
  } catch (e) {
    if (e instanceof AuthError) {
      router.push('/auth/signin');
    } else {
      toast.value = true;
      error.value =
        typeof errorMessage === 'string' ? errorMessage : errorMessage(e);
    }
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <slot
    name="trigger"
    :props="{ loading: pending }"
    :clickHandler="clickHandler"
  />

  <v-snackbar
    v-model="toast"
    variant="flat"
    color="error"
    rounded="pill"
    location="top"
    timeout="2000"
  >
    {{ error }}
    <template v-slot:actions>
      <v-btn variant="text" color="white" @click="toast = false">Cerrar</v-btn>
    </template>
  </v-snackbar>
</template>
