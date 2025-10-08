<script setup lang="ts">
import { VTextField, VBtn } from 'vuetify/components';
</script>

<template>
  <div>
    <h1>Creá tu cuenta</h1>

    <form>
      <VTextField placeholder="Nombre" type="text" required />
      <VTextField placeholder="Apellido" type="text" required />
      <VTextField placeholder="Correo electrónico" type="email" required />
      <VTextField placeholder="Contraseña" type="password" required />
      <VTextField placeholder="Repetir contraseña" type="password" required />
      <VBtn type="submit" block>Crear cuenta</VBtn>
    </form>

    <p class="register">
      <router-link to="/auth/signin">¿Ya tenés una cuenta? Iniciar sesión</router-link>
    </p>
  </div>
</template>
