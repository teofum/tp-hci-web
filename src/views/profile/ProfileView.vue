<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VTextField, VBtn, VAlert } from 'vuetify/components';
import { auth } from '@/api/users';
import { useStore } from '@/store/store';
import { storeToRefs } from 'pinia';

const router = useRouter();

const store = useStore();
const { user } = storeToRefs(store);

const name = ref(user.value?.name ?? '');
const surname = ref(user.value?.surname ?? '');
const email = ref(user.value?.email ?? '');

const error = ref('');
const success = ref('');
const loading = ref(false);

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
  <div>
    <h1>Perfil</h1>

    <form @submit.prevent="handleUpdate">
      <VAlert v-if="success" variant="tonal" type="success" class="mt-2">
        {{ success }}
      </VAlert>
      <VAlert v-if="error" variant="tonal" type="error" class="mt-2">
        {{ error }}
      </VAlert>

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
