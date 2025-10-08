<script setup lang="ts">
import { ref, onMounted } from 'vue'
import listEntry from '@/components/misListas/listEntry.vue'
import NuevaListaBoton from '@/components/misListas/buttonNewListPopup.vue'


const BASE_URL = 'http://localhost:8080'            
const token = localStorage.getItem('token') || ''   

async function fetchJSON(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {})
    }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

const lists = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function loadLists() {
  loading.value = true
  error.value = null
  try {
    const json = await fetchJSON(`${BASE_URL}/api/shopping-lists?page=1&per_page=20&order=ASC`)
    lists.value = Array.isArray(json) ? json : (json.data ?? [])
  } catch (e:any) {
    error.value = e?.message ?? 'Failed to load lists'
  } finally {
    loading.value = false
  }
}

onMounted(loadLists)
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
            <listEntry
              :name="l.name"
              :items-count="l.itemsCount ?? l.items_count ?? (l.items?.length ?? 0)"
              :image="l.imageUrl ?? l.image_url ?? null"
            />
          </li>
        </ul>
      </div>

      <NuevaListaBoton>+ Nueva Lista</NuevaListaBoton>
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

<style>
.ml-body {
  /* todo colores en variables */ 
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ece7df;
}

.ml-main-container{
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;

  margin: 160px 0;
}

.ml_listas_container{
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: baseline;
}

.ml_listas {
  width: 100%;

  list-style-type: none;
  padding: 0; 
  margin: 0;
}
.ml-titulo{
  font-size: 2rem;
  font-weight: 700;
  color: #000;
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
