<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VTextField, VBtn, VAlert } from 'vuetify/components';
import { auth } from '@/api/users';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = '';
    const { token } = await auth.login(email.value, password.value);
    localStorage.setItem('token', token);
    router.push('/');
  } catch {
    error.value = 'Email o contraseña incorrectos';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-100 d-flex flex-column align-center">
    <h1 class="mb-4">Iniciar sesión</h1>

    <VAlert v-if="error" type="error" class="mb-8 w-100">
      {{ error }}
    </VAlert>

    <form
      @submit.prevent="handleLogin"
      class="d-flex flex-column ga-6 mb-6 w-100 align-center"
    >
      <VTextField
        v-model="email"
        label="Correo electrónico"
        type="email"
        required
        class="w-100"
      />
      <VTextField
        v-model="password"
        label="Contraseña"
        type="password"
        required
        class="w-100"
      />

      <VBtn type="submit" :loading="loading" min-width="16rem">
        Iniciar Sesión
      </VBtn>
    </form>

    <VBtn to="/auth/forgot-password" variant="text">
      ¿Olvidaste tu contraseña?
    </VBtn>
    <VBtn to="/auth/signup" variant="text">
      ¿No tenés una cuenta? Registrate
    </VBtn>
  </div>
</template>
