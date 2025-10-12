<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';
import ListItem from '@/components/ListItem.vue';
import AddListDialog from '@/components/lists/AddListDialog.vue';
import { useRouter } from 'vue-router';
import ShareListDialog from '@/components/lists/ShareListDialog.vue';

const store = useStore();
const { lists } = storeToRefs(store);

const router = useRouter();

function redirectList(id: number) {
  router.push({ name: 'list-detail', params: { id } });
}
</script>

<template>
  <v-container max-width="800" class="container">
    <div class="d-flex flex-row justify-space-between align-center w-100">
      <h1 class="heading text-high-emphasis">Listas</h1>
    </div>
    <div class="w-100">
      <ul>
        <ListItem
          v-for="list in lists"
          :key="list.id"
          :name="list.name"
          :emoji="list.emoji"
          :detail="list.description"
          @click="redirectList(list.id)"
          style="cursor: pointer"
        >
          <v-menu>
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                variant="text"
                icon="mdi-dots-vertical"
              />
            </template>

            <v-list>
              <AddListDialog :list="list">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-list-item
                    v-bind="activatorProps"
                    prepend-icon="mdi-pencil-outline"
                    title="Modificar"
                  />
                </template>
              </AddListDialog>
              <ShareListDialog :list-id="list.id">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-list-item
                    v-bind="activatorProps"
                    prepend-icon="mdi-share-variant"
                    title="Compartir"
                  />
                </template>
              </ShareListDialog>
              <v-list-item
                class="text-red"
                prepend-icon="mdi-delete-outline"
                title="Eliminar"
                @click="store.deleteList(list.id)"
              />
            </v-list>
          </v-menu>
        </ListItem>
      </ul>
    </div>

    <AddListDialog>
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          app
          location="bottom end"
          size="x-large"
          text="Agregar lista"
          prepend-icon="mdi-plus"
          variant="flat"
        />
      </template>
    </AddListDialog>
  </v-container>
</template>

<style scoped>
.heading {
  font-size: 3rem;
  font-weight: 700;
}
</style>
