<script setup lang="ts" generic="K extends string | number | symbol, T">
import { defineProps } from 'vue';

const { group, allItems, groupedItems } = defineProps<{
  group: boolean;
  allItems: T[];
  groupedItems: Record<K, [string, T[]]>;
}>();
</script>

<template>
  <div v-if="group">
    <div
      v-for="[key, [groupName, items]] in Object.entries<
        (typeof groupedItems)[K]
      >(groupedItems)"
      :key="key"
    >
      <h2 class="text-medium-emphasis mt-3 category-heading">
        {{ groupName }}
      </h2>

      <ul>
        <slot v-for="item in items" :item="item" />
      </ul>
    </div>
  </div>
  <div v-else>
    <ul>
      <slot v-for="item in allItems" :item="item" />
    </ul>
  </div>
</template>
