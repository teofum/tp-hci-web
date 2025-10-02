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

.auth-card input {
  width: 358px;
  height: 50px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #efefe9;
  font-size: 1rem;
}

.auth-card input:focus {
  border: 1px solid #223030;
  box-shadow: 0px 0px 0px 3px #2230304d;
  outline: none;
}

.auth-card button {
  width: 358px;
  height: 40px;
  padding: 0 16px;
  background-color: #223030;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.auth-card button:hover {
  opacity: 0.9;
}

.auth-card p {
  font-size: 0.875rem;
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
