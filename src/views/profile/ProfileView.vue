<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { VTextField, VBtn, VAlert } from 'vuetify/components';
import { auth } from '@/api/users';

const router = useRouter();
const name = ref('');
const surname = ref('');
const email = ref('');
const error = ref('');
const success = ref('');
const loading = ref(false);
const loadingProfile = ref(true);

onMounted(async () => {
  try {
    const data = await auth.getCurrentUser();
    name.value = data.name;
    surname.value = data.surname;
    email.value = data.email;
  } catch {
    router.push('/auth/signin');
  } finally {
    loadingProfile.value = false;
  }
});

const handleUpdate = async () => {
  try {
    loading.value = true;
    error.value = '';
    success.value = '';
    await auth.updateProfile(name.value, surname.value);
    success.value = 'Perfil actualizado correctamente';
  } catch {
    error.value = 'Error al actualizar el perfil';
  } finally {
    loading.value = false;
  }
};

const handleLogout = async () => {
  try {
    await auth.logout();
  } catch {
    // I guess error handling is not needed here
  } finally {
    localStorage.removeItem('token');
    router.push('/auth/signin');
  }
};
</script>

<template>
  <div v-if="!loadingProfile">
    <h1>Mi Perfil</h1>

    <form @submit.prevent="handleUpdate">
      <VTextField v-model="name" placeholder="Nombre" type="text" required />
      <VTextField
        v-model="surname"
        placeholder="Apellido"
        type="text"
        required
      />
      <VTextField
        v-model="email"
        placeholder="Correo electrónico"
        type="email"
        disabled
      />

      <VBtn type="submit" block :loading="loading">Guardar cambios</VBtn>
      <VAlert v-if="success" type="success" class="mt-2">{{ success }}</VAlert>
      <VAlert v-if="error" type="error" class="mt-2">{{ error }}</VAlert>
    </form>

    <VBtn
      variant="text"
      block
      @click="router.push('/profile/change-password')"
      class="mt-4"
    >
      Cambiar contraseña
    </VBtn>

    <VBtn variant="text" block @click="handleLogout" class="mt-2">
      Cerrar sesión
    </VBtn>
  </div>
</template>
