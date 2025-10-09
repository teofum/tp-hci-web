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
  <div class="w-100 d-flex flex-column align-center">
    <h1 class="mb-4">Resetear contraseña</h1>

    <VAlert v-if="error" type="error" class="mb-8">{{ error }}</VAlert>

    <form
      @submit.prevent="handleResetPassword"
      class="d-flex flex-column ga-6 mb-6 w-100 align-center"
    >
      <VTextField
        v-model="code"
        placeholder="Código de verificación"
        type="text"
        required
        class="w-100"
      />
      <VTextField
        v-model="password"
        placeholder="Nueva contraseña"
        type="password"
        required
        class="w-100"
      />
      <VTextField
        v-model="confirmPassword"
        placeholder="Confirmar contraseña"
        type="password"
        required
        class="w-100"
      />

      <VBtn type="submit" :loading="loading" min-width="16rem">
        Resetear contraseña
      </VBtn>
    </form>

    <VBtn variant="text" to="/auth/signin">Volver al inicio de sesión</VBtn>
  </div>
</template>
