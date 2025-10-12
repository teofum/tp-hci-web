<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store/store';
import z from 'zod';
import type { List } from '@/schemas/list.schema';
import type { User } from '@/schemas/user.schema';

const { list } = defineProps<{
  list: List;
}>();

const store = useStore();

const shareEmail = ref('');

async function share() {
  store.shareList(list.id, shareEmail.value);
}

async function unshare(userId: number) {
  store.unshareList(list.id, userId);
}

function initials(user: User) {
  return `${user.name[0].toUpperCase()}${user.surname[0].toUpperCase()}`;
}
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card variant="outlined" class="bg-surface" :title="'Compartir lista'">
        <v-card-item
          v-if="list.sharedWith.length > 0"
          class="shared-with-container"
        >
          <ul class="shared-with">
            <li
              v-for="user in list.sharedWith"
              :key="user.id"
              class="shared-item"
            >
              <div class="avatar bg-surface-variant text-secondary">
                {{ initials(user) }}
              </div>
              <div class="name">{{ user.name }} {{ user.surname }}</div>
              <v-btn
                class="unshare bg-surface"
                icon="mdi-close"
                color="error"
                variant="tonal"
                size="x-small"
                @click="unshare(user.id)"
              />
            </li>
          </ul>
        </v-card-item>

        <v-card-item>
          <div class="d-flex flex-column align-center py-2 ga-4">
            <v-text-field
              v-model="shareEmail"
              label="Correo electrónico"
              type="email"
              class="w-100"
            />
          </div>
        </v-card-item>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="flat"
            text="Compartir"
            :disabled="!shareEmail || !z.email().safeParse(shareEmail).success"
            @click="
              share();
              isActive.value = false;
            "
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.select {
  flex-grow: 1;
}

.shared-with-container {
  & > * {
    overflow: visible !important;
  }
}

.shared-with {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
  list-style: none;
}

.shared-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  position: relative;
  min-width: 5rem;

  .unshare {
    position: absolute;
    top: -0.5rem;
    right: 0;
  }
}

.avatar {
  width: 4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  place-items: center;

  font-size: 1.5rem;
  font-weight: 600;
}

.name {
  font-size: 0.875rem;
}
</style>
