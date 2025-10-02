<template>
  <div>
    <h1>Iniciar sesión</h1>

    <form>
      <input type="email" placeholder="Correo electrónico" required />
      <input type="password" placeholder="Contraseña" required />
      <button type="submit">Iniciar Sesión</button>
    </form>

    <p class="forgot-password">¿Olvidaste tu contraseña?</p>
    <p class="register">
      <router-link to="/auth/signup">¿No tenés una cuenta? Registrate</router-link>
    </p>
  </div>
</template>
