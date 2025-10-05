<script setup lang="ts">
import listEntry from '@/components/misListas/listEntry.vue'
import NuevaListaBoton from '@/components/misListas/nuevaListaButton.vue'
</script>

<template>
  <div class="ml-body">
    <div class="ml-main-container">
      
      <h1 class="ml-titulo">Mis listas</h1>
      
      <div class="ml_listas_container">
            <!--todo esto seguro esta mal-->
            <ul class="ml_listas">
              <li>
                <listEntry />
              </li>
            </ul>
      </div>
      
      <NuevaListaBoton />

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
  width: 60%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
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
