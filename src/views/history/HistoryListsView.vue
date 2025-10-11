<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';
import ListItem from '@/components/ListItem.vue';
import { ref, computed } from 'vue';

const store = useStore();
const { lists } = storeToRefs(store);
const router = useRouter();

const searchQuery = ref('');
const orderBy = ref('name');
const filterBy = ref('all');

function redirectList(id: number) {
  router.push({ name: 'list-detail', params: { id } });
}

// const filteredLists = ; // TODO listas filtradas
</script>

<template>
  <v-container max-width="800" class="container">
    <div class="d-flex flex-row justify-space-between align-center w-100">
      <h1 class="heading text-high-emphasis">Historial</h1>
    </div>

    <div class="d-flex flex-column ga-2 my-4">
      <v-text-field
        label="Buscar listas"
        type="text"
        class="w-100"
        clearable
        clear-icon="mdi-close-circle-outline"
      />
    </div>

    <div class="d-flex ga-4">
      <v-select
        :items="['Fecha', 'Items']"
        label="Ordenar por"
        style="max-width: 160px"
      >

      </v-select>

      <v-select
        :items="['Hoy', 'Hace una semana', 'Hace un mes']"
        label="Filtrar"
        style="max-width: 160px"
      ></v-select>
    </div>

    <div class="ml_listas_container">
      <ul class="ml_listas">
        <ListItem
          v-for="list in lists"
          :key="list.id"
          :name="list.name"
          :emoji="list.emoji"
          :detail="'TODO items completos'"
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
              <v-list-item
                prepend-icon="mdi-reload"
                title="Recuperar"
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
