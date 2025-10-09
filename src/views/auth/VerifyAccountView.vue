<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { VTextField, VBtn, VAlert } from 'vuetify/components';
import { auth } from '@/api/users';

const router = useRouter();
const code = ref('');
const error = ref('');
const loading = ref(false);
const resending = ref(false);
const email = ref(history.state.email || '');

onMounted(() => {
  if (!email.value) {
    router.push('/auth/signup');
  }
});

const handleVerify = async () => {
  try {
    loading.value = true;
    error.value = '';
    await auth.verifyAccount(code.value);
    router.push('/auth/signin');
  } catch {
    error.value = 'Código de verificación inválido';
  } finally {
    loading.value = false;
  }
};

const handleResend = async () => {
  try {
    resending.value = true;
    error.value = '';
    await auth.sendVerification(email.value);
  } catch {
    error.value = 'Error al reenviar el código';
  } finally {
    resending.value = false;
  }
};
</script>

<template>
  <div class="w-100 d-flex flex-column align-center">
    <h1 class="mb-4">Verificá tu cuenta</h1>

    <VAlert v-if="error" type="error" class="mb-8">{{ error }}</VAlert>

    <form
      @submit.prevent="handleVerify"
      class="d-flex flex-column ga-6 mb-6 w-100 align-center"
    >
      <VTextField
        v-model="code"
        placeholder="Código de verificación"
        type="text"
        required
        class="w-100"
      />

      <VBtn type="submit" :loading="loading" min-width="16rem">Verificar</VBtn>
    </form>

    <VBtn variant="text" @click.prevent="handleResend">
      ¿No recibiste el código? Reenviar
    </VBtn>
    <VBtn variant="text" to="/auth/signin">Volver al inicio de sesión</VBtn>
  </div>
</template>
