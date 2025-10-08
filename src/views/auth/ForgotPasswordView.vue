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
      router.push({ path: '/auth/reset-password', state: { email: email.value } });
    }, 3000);
  } catch {
    error.value = 'Error al enviar el código';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1>Recuperá tu contraseña</h1>

    <form @submit.prevent="handleForgotPassword">
      <VTextField
        v-model="email"
        placeholder="Correo electrónico"
        type="email"
        required
      />

      <VBtn type="submit" block :loading="loading">Enviar código</VBtn>
      <VAlert v-if="success" type="success" class="mt-2">{{ success }}</VAlert>
      <VAlert v-if="error" type="error" class="mt-2">{{ error }}</VAlert>
    </form>

    <p class="register">
      <router-link to="/auth/signin"
        >¿Recordás tu contraseña? Volvé al inicio</router-link
      >
    </p>
  </div>
</template>
