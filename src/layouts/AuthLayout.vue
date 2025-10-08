<template>
  <div class="auth-bg">
    <div class="auth-card">
      <div class="icon-box">
        <!-- TODO: poner icono -->
      </div>

      <router-view />
    </div>
  </div>
</template>

<style>
.auth-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ece7df;
}

.auth-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
}

.icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: #714e4a;
  border-radius: 24px;
  margin-bottom: 32px;
}

.auth-card h1 {
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  color: #000000d9;
  margin: 0 0 24px 0;
}

.auth-card form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 1.5rem;
}

/* Vuetify overrides - solo tamaños específicos */
.auth-card .v-field {
  width: 358px;
  height: 50px;
  border-radius: 12px !important;
}

.auth-card .v-field__input {
  padding: 12px 16px;
  min-height: 50px;
  align-items: center;
}

.auth-card .v-field--focused {
  border: 1px solid #223030 !important;
  box-shadow: 0px 0px 0px 3px #2230304d !important;
}

.auth-card .v-btn {
  width: 358px;
  height: 40px;
  border-radius: 20px;
  text-transform: none;
  letter-spacing: normal;
  font-size: 1rem;
}

.auth-card p {
  color: #000000a6;
  margin: 0;
  text-align: center;
}

.auth-card .forgot-password {
  margin-bottom: 16px;
}

.auth-card a {
  color: #000000a6;
  text-decoration: none;
}

.auth-card a:hover {
  text-decoration: underline;
}
</style>
