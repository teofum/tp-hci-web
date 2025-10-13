<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  detail?: string;
  emoji?: string;
  purchased?: boolean;
  progress?: number;
}>();

const progressHeight = computed(() =>
  props.purchased ? 100 : (props.progress ?? 0) * 100,
);
</script>

<template>
  <li :class="`container ${$attrs.onClick ? 'clickable' : ''}`">
    <div class="emoji-container bg-surface-variant">
      <div
        class="progress bg-success"
        :style="{ height: `${progressHeight}%` }"
      />
      <div class="emoji">{{ emoji }}</div>
    </div>

    <div :class="`text-container${purchased ? ' purchased' : ''}`">
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

  &.clickable {
    border-radius: 1.5rem;
    transition: background-color 300ms ease;
    cursor: pointer;
    &:hover {
      background-color: rgba(var(--v-theme-background));
    }
  }
}

.emoji-container {
  display: grid;
  place-items: center;

  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  border-radius: 12px;

  position: relative;
  overflow: hidden;

  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-image: linear-gradient(hsl(0 0 100 / 0.4), hsl(0 0 100 / 0.4));

    transition-property: height;
    transition-timing-function: ease-in-out;
    transition-duration: 200ms;
  }

  .emoji {
    position: relative;
  }
}

.text-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &.purchased {
    * {
      text-decoration: line-through;
      opacity: 0.8;
    }
  }

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
