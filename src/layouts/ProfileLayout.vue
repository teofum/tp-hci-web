<template>
  <div class="profile-bg">
    <div class="profile-card">
      <router-view />
    </div>
  </div>
</template>

<style>
.profile-bg {
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
}

.profile-card {
  width: 100%;
  max-width: 420px;
}

.profile-card h1 {
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  color: #000000d9;
  margin: 0 0 24px 0;
}

.profile-card form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.profile-card p {
  font-size: 0.875rem;
  color: #000000a6;
  margin: 0;
  text-align: center;
}

.profile-card a {
  color: #000000a6;
  text-decoration: none;
}

.profile-card a:hover {
  text-decoration: underline;
}
</style>
