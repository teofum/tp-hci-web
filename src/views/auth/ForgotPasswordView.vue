<template>
  <div>
    <h1>Recuperá tu contraseña</h1>

    <form>
      <input type="email" placeholder="Correo electrónico" required />
      <button type="submit">Enviar enlace</button>
    </form>

    <p class="register">
      <router-link to="/auth/signin">¿Recordás tu contraseña? Volvé al inicio</router-link>
    </p>
  </div>
</template>
