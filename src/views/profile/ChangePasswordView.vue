<script setup lang="ts">
import { ref } from 'vue';
import { VTextField, VBtn, VAlert } from 'vuetify/components';
import { auth } from '@/api/users';
import { rules } from '@/utils/rules';

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const error = ref('');
const success = ref('');
const loading = ref(false);

const handleChangePassword = async () => {
  if (newPassword.value !== confirmNewPassword.value) {
    error.value = 'Las contraseñas no coinciden';
    return;
  }

  try {
    loading.value = true;
    error.value = '';
    success.value = '';
    await auth.changePassword(currentPassword.value, newPassword.value);
    success.value = 'Contraseña actualizada correctamente';
    currentPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
  } catch {
    error.value = 'Error al cambiar la contraseña';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1>Cambiar contraseña</h1>

    <form @submit.prevent="handleChangePassword">
      <VTextField
        v-model="currentPassword"
        label="Contraseña actual"
        type="password"
        required
        :rules="[rules.required]"
      />
      <VTextField
        v-model="newPassword"
        label="Nueva contraseña"
        type="password"
        required
        :rules="[rules.required]"
      />
      <VTextField
        v-model="confirmNewPassword"
        label="Confirmar nueva contraseña"
        type="password"
        required
        :rules="[rules.required, rules.equal(newPassword)]"
      />

      <VBtn type="submit" block :loading="loading"> Cambiar contraseña </VBtn>
      <VAlert v-if="success" type="success" class="mt-2">{{ success }}</VAlert>
      <VAlert v-if="error" type="error" class="mt-2">{{ error }}</VAlert>
    </form>

    <p class="mt-4">
      <router-link to="/profile">Volver al perfil</router-link>
    </p>
  </div>
</template>
