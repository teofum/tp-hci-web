<template>
  <div>
    <h1>Creá tu cuenta</h1>

    <form>
      <input type="text" placeholder="Nombre" required />
      <input type="text" placeholder="Apellido" required />
      <input type="email" placeholder="Correo electrónico" required />
      <input type="password" placeholder="Contraseña" required />
      <input type="password" placeholder="Repetir contraseña" required />
      <button type="submit">Crear cuenta</button>
    </form>

    <p class="register">
      <router-link to="/auth/signin">¿Ya tenés una cuenta? Iniciar sesión</router-link>
    </p>
  </div>
</template>
