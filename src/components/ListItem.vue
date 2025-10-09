<script setup lang="ts">
defineProps<{
  name: string;
  detail?: string;
  emoji?: string;
}>();
</script>

<template>
  <li class="container">
    <div class="emoji-container bg-surface-variant">
      {{ emoji }}
    </div>

    <div class="text-container">
      <h3 class="name text-high-emphasis">{{ name }}</h3>
      <p class="detail text-medium-emphasis" v-if="detail">{{ detail }}</p>
    </div>

    <div class="slot-container">
      <slot />
    </div>
  </li>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  user-select: none;
}

.emoji-container {
  display: grid;
  place-items: center;

  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  border-radius: 12px;
}

.text-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.5;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
  }
}

.slot-container {
  margin-left: auto;
}
</style>
