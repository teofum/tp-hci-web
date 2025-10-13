<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';
import ListItem from '@/components/ListItem.vue';
import AddListDialog from '@/components/lists/AddListDialog.vue';
import { useRouter } from 'vue-router';
import ShareListDialog from '@/components/lists/ShareListDialog.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

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
              <ShareListDialog :list="list">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-list-item
                    v-bind="activatorProps"
                    prepend-icon="mdi-share-variant"
                    title="Compartir"
                  />
                </template>
              </ShareListDialog>
              <ConfirmationDialog
                title="Eliminar lista"
                danger
                @confirm="store.deleteList(list.id)"
              >
                <template v-slot:activator="{ props: activatorProps }">
                  <v-list-item
                    v-bind="activatorProps"
                    class="text-red"
                    prepend-icon="mdi-delete-outline"
                    title="Eliminar"
                  />
                </template>

                <template v-slot:default>
                  <p>¿Eliminar {{ list.name }}?</p>
                  <p class="mt-3 warning text-error">
                    Esta operación no se puede deshacer
                  </p>
                </template>
              </ConfirmationDialog>
            </v-list>
          </v-menu>
        </ListItem>
      </ul>
    </div>

    <v-card variant="tonal" class="placeholder" v-if="lists.length === 0">
      <div class="title">No hay listas</div>

      <AddListDialog>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            text="Agregar lista"
            prepend-icon="mdi-plus"
            variant="flat"
          />
        </template>
      </AddListDialog>
    </v-card>

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

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 4rem;

  .title {
    font-size: 2rem;
    font-weight: 700;
  }
}
</style>
