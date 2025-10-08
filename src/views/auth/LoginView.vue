<script setup lang="ts">
import { VTextField, VBtn } from 'vuetify/components';
</script>

<template>
  <div>
    <h1>Iniciar sesión</h1>

    <form>
      <VTextField
        placeholder="Correo electrónico"
        type="email"
        required
      />
      <VTextField
        placeholder="Contraseña"
        type="password"
        required
      />
      <VBtn type="submit" block>Iniciar Sesión</VBtn>
    </form>

    <p class="forgot-password">
      <router-link to="/auth/forgot-password">¿Olvidaste tu contraseña?</router-link>
    </p>
    <p class="register">
      <router-link to="/auth/signup">¿No tenés una cuenta? Registrate</router-link>
    </p>
  </div>
</template>
