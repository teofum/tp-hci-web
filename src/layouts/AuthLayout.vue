<template>
  <div
    class="d-flex justify-center align-center h-screen bg-surface overflow-auto py-10"
  >
    <div class="auth-card">
      <div class="icon-box">
        <v-icon icon="mdi-shopping-outline" size="64" color="white" />
      </div>

      <router-view />
    </div>
  </div>
</template>

<style>
.auth-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 26rem;
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
</style>
