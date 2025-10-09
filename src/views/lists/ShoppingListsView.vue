<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ListEntry from '@/components/lists/ListEntry.vue';
import NewListButton from '@/components/lists/NewListButton.vue';
import { lists as listsApi } from '@/api/lists';

type ShoppingListItem = {
  id: number;
  name: string;
};

type ShoppingList = {
  id: number;
  name: string;
  itemsCount?: number;
  items_count?: number;
  items?: ShoppingListItem[];
  imageUrl?: string;
  image_url?: string;
};

const lists = ref<ShoppingList[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function loadLists() {
  loading.value = true;
  error.value = null;
  try {
    lists.value = await listsApi.getLists({ page: 1, per_page: 20, order: 'ASC' });
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al cargar las listas';
  } finally {
    loading.value = false;
  }
}

onMounted(loadLists);
</script>

<template>
  <div class="ml-body">
    <div class="ml-main-container">
      <h1 class="ml-titulo">Mis listas</h1>

      <div class="ml_listas_container">
        <ul class="ml_listas">
          <li v-if="loading"><p>Cargando…</p></li>
          <li v-else-if="error"><p>{{ error }}</p></li>
          <li v-else-if="!lists.length"><p>Sin listas todavía.</p></li>

          <li v-for="l in lists" :key="l.id">
            <ListEntry
              :id="l.id"
              :name="l.name"
              :items-count="l.itemsCount ?? l.items_count ?? (l.items?.length ?? 0)"
              :image="l.imageUrl ?? l.image_url ?? ''"
            />
          </li>
        </ul>
      </div>

      <NewListButton>+ Nueva Lista</NewListButton>
    </div>
  </div>
</template>

<!-- ejemplo vue for -- 
<script setup>
import { ref } from 'vue'

const list = ref([1, 2, 3])
</script>

<template>
  <button @click="list.push(list.length + 1)">Push Number</button>
  <button @click="list.pop()">Pop Number</button>
  
  <ul v-if=" list.length">
    <li v-for="item of list">{{ item }}</li>
  </ul>
  <p v-else-if="list.length">List is not empty, but hidden.</p>
  <p v-else>List is empty.</p>
</template>
-->

<style scoped>
.ml-body {
  color: black;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #EFEFE9;
  padding: 40px 20px;
}

.ml-main-container{
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
}

.ml-titulo{
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;
}

.ml_listas_container{
  width: 100%;
}

.ml_listas {
  width: 100%;
  list-style-type: none;
  padding: 0; 
  margin: 0;
}

p {
  font-size: 0.875rem;
  color: #000000a6;
  margin: 0;
  text-align: center;
}

a {
  color: #000000a6;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
