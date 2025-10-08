<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { VTextField, VBtn, VAlert } from 'vuetify/components';
import { auth } from '@/api/users';

const router = useRouter();
const code = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const loading = ref(false);
const email = ref(history.state.email || '');

onMounted(() => {
  if (!email.value) {
    router.push('/auth/forgot-password');
  }
});

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden';
    return;
  }

  try {
    loading.value = true;
    error.value = '';
    await auth.resetPassword(code.value, password.value);
    router.push('/auth/signin');
  } catch {
    error.value = 'Código inválido o expirado';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1>Resetear contraseña</h1>

    <form @submit.prevent="handleResetPassword">
      <VTextField
        v-model="code"
        placeholder="Código de verificación"
        type="text"
        required
      />
      <VTextField
        v-model="password"
        placeholder="Nueva contraseña"
        type="password"
        required
      />
      <VTextField
        v-model="confirmPassword"
        placeholder="Confirmar contraseña"
        type="password"
        required
      />

      <VBtn type="submit" block :loading="loading">Resetear contraseña</VBtn>
      <VAlert v-if="error" type="error" class="mt-2">{{ error }}</VAlert>
    </form>

    <p class="register">
      <router-link to="/auth/signin">Volver al inicio de sesión</router-link>
    </p>
  </div>
</template>
