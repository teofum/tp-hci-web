<script setup lang="ts">
import ListEntry from '@/components/lists/ListEntry.vue';
import NewListButton from '@/components/lists/AddListButton.vue';


</script>

<template>
  <div class="ml-body">
    <v-container max-width="800" class="container">
      <div class="d-flex flex-row justify-space-between align-center w-100">
        <h1 class="text-high-emphasis">Mis Listas</h1>
      </div>
      <div class="ml_listas_container">
        <ul class="ml_listas">
          <li>
            <ListEntry/>
          </li>
        </ul>
      </div>

      <NewListButton>+ Nueva Lista</NewListButton>
    </v-container>
    </div>
</template>


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
