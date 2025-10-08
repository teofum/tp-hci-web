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
  <div>
    <h1>Verificá tu cuenta</h1>

    <form @submit.prevent="handleVerify">
      <VTextField
        v-model="code"
        placeholder="Código de verificación"
        type="text"
        required
      />

      <VBtn type="submit" block :loading="loading">Verificar</VBtn>
      <VAlert v-if="error" type="error" class="mt-2">{{ error }}</VAlert>
    </form>

    <p class="register">
      <a href="#" @click.prevent="handleResend"
        >¿No recibiste el código? Reenviar</a
      >
    </p>
    <p class="register">
      <router-link to="/auth/signin">Volver al inicio de sesión</router-link>
    </p>
  </div>
</template>
