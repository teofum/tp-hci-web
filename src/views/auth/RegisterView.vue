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
  <div>
    <h1>Creá tu cuenta</h1>

    <form @submit.prevent="handleRegister">
      <VTextField v-model="name" placeholder="Nombre" type="text" required />
      <VTextField v-model="surname" placeholder="Apellido" type="text" required />
      <VTextField v-model="email" placeholder="Correo electrónico" type="email" required />
      <VTextField v-model="password" placeholder="Contraseña" type="password" required />
      <VTextField v-model="confirmPassword" placeholder="Repetir contraseña" type="password" required />
      
      <VBtn type="submit" block :loading="loading">Crear cuenta</VBtn>
      <VAlert v-if="error" type="error" class="mt-2">{{ error }}</VAlert>
    </form>

    <p class="register">
      <router-link to="/auth/signin"
        >¿Ya tenés una cuenta? Iniciar sesión</router-link
      >
    </p>
  </div>
</template>
