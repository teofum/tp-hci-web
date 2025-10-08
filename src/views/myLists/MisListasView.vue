<script setup lang="ts">
import { ref, onMounted } from 'vue'
import listEntry from '@/components/misListas/listEntry.vue'
import NuevaListaBoton from '@/components/misListas/buttonNewListPopup.vue'
import { getLists, type ShoppingListDto } from '@/services/lists.service'

const lists = ref<ShoppingListDto[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    lists.value = await getLists({ page: 1, per_page: 20, order: "ASC" })
  } catch (e: any) {
    error.value = e?.message ?? 'Error loading lists'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="ml-body">
    <div class="ml-main-container">
      <h1 class="ml-titulo">Mis listas</h1>

      <div class="ml_listas_container">
        <ul class="ml_listas">
          <li v-if="loading">
            <p>Cargando…</p>
          </li>
          <li v-else-if="error">
            <p>{{ error }}</p>
          </li>
          <li v-else-if="!lists.length">
            <p>No tenés listas aún.</p>
          </li>
          <li v-else v-for="l in lists" :key="l.id">
            <listEntry
              :name="l.name"
              :count="l.itemCount ?? 0"
              :image-url="l.imageUrl || undefined"
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
