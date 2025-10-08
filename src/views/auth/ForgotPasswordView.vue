<script setup lang="ts">
import { VTextField, VBtn } from 'vuetify/components';
</script>

<template>
  <div>
    <h1>Recuperá tu contraseña</h1>

    <form>
      <VTextField placeholder="Correo electrónico" type="email" required />
      <VBtn type="submit" block>Enviar enlace</VBtn>
    </form>

    <p class="register">
      <router-link to="/auth/signin"
        >¿Recordás tu contraseña? Volvé al inicio</router-link
      >
    </p>
  </div>
</template>
