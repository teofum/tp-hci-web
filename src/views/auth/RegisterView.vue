<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VTextField, VBtn, VAlert } from 'vuetify/components';
import { auth } from '@/api/users';

const router = useRouter();
const name = ref('');
const surname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const loading = ref(false);

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden';
    return;
  }

  try {
    loading.value = true;
    error.value = '';
    await auth.register(name.value, surname.value, email.value, password.value);
    router.push({ path: '/auth/verify', state: { email: email.value } });
  } catch {
    error.value = 'Error al crear la cuenta';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-100 d-flex flex-column align-center">
    <h1 class="mb-4">Creá tu cuenta</h1>

    <VAlert v-if="error" type="error" class="mb-8">{{ error }}</VAlert>

    <form
      @submit.prevent="handleRegister"
      class="d-flex flex-column ga-6 mb-6 w-100 align-center"
    >
      <VTextField
        v-model="name"
        placeholder="Nombre"
        type="text"
        required
        class="w-100"
      />
      <VTextField
        v-model="surname"
        placeholder="Apellido"
        type="text"
        required
        class="w-100"
      />
      <VTextField
        v-model="email"
        placeholder="Correo electrónico"
        type="email"
        required
        class="w-100"
      />
      <VTextField
        v-model="password"
        placeholder="Contraseña"
        type="password"
        required
        class="w-100"
      />
      <VTextField
        v-model="confirmPassword"
        placeholder="Repetir contraseña"
        type="password"
        required
        class="w-100"
      />

      <VBtn type="submit" :loading="loading" min-width="16rem">
        Crear cuenta
      </VBtn>
    </form>

    <VBtn variant="text" to="/auth/signin">
      ¿Ya tenés una cuenta? Iniciar sesión
    </VBtn>
  </div>
</template>
