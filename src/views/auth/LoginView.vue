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
    const data = await auth.login(email.value, password.value);
    localStorage.setItem('token', data.token);
    router.push('/');
  } catch {
    error.value = 'Email o contraseña incorrectos';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1>Iniciar sesión</h1>

    <form @submit.prevent="handleLogin">
      <VTextField
        v-model="email"
        placeholder="Correo electrónico"
        type="email"
        required
      />
      <VTextField
        v-model="password"
        placeholder="Contraseña"
        type="password"
        required
      />

      <VBtn type="submit" block :loading="loading">Iniciar Sesión</VBtn>
      <VAlert v-if="error" type="error" class="mt-2">{{ error }}</VAlert>
    </form>

    <p class="forgot-password">
      <router-link to="/auth/forgot-password"
        >¿Olvidaste tu contraseña?</router-link
      >
    </p>
    <p class="register">
      <router-link to="/auth/signup"
        >¿No tenés una cuenta? Registrate</router-link
      >
    </p>
  </div>
</template>
