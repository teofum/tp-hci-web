<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VTextField, VBtn, VAlert } from 'vuetify/components';
import { auth } from '@/api/users';

const router = useRouter();
const email = ref('');
const error = ref('');
const success = ref('');
const loading = ref(false);

const handleForgotPassword = async () => {
  try {
    loading.value = true;
    error.value = '';
    success.value = '';
    await auth.forgotPassword(email.value);
    success.value = 'Te enviamos un código a tu email';
    setTimeout(() => {
      router.push({
        path: '/auth/reset-password',
        state: { email: email.value },
      });
    }, 3000);
  } catch {
    error.value = 'Error al enviar el código';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-100 d-flex flex-column align-center">
    <h1 class="mb-4">Recuperá tu contraseña</h1>

    <VAlert v-if="success" type="success" class="mb-8">{{ success }}</VAlert>
    <VAlert v-if="error" type="error" class="mb-8">{{ error }}</VAlert>

    <form
      @submit.prevent="handleForgotPassword"
      class="d-flex flex-column ga-6 mb-6 w-100 align-center"
    >
      <VTextField
        v-model="email"
        placeholder="Correo electrónico"
        type="email"
        required
        class="w-100"
      />

      <VBtn type="submit" :loading="loading" min-width="16rem">
        Enviar código
      </VBtn>
    </form>

    <VBtn variant="text" to="/auth/signin">
      ¿Recordás tu contraseña? Volvé al inicio
    </VBtn>
  </div>
</template>
