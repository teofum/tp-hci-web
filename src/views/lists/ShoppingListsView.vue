<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';
import NewListButton from '@/components/lists/AddListButton.vue';
import ListItem from '@/components/ListItem.vue';

const store = useStore();
const { lists } = storeToRefs(store);



</script>

<template>
  <div class="ml-body">
    <v-container max-width="800" class="container">
      <div class="d-flex flex-row justify-space-between align-center w-100">
        <h1 class="text-high-emphasis">Mis Listas</h1>
      </div>
      <div class="ml_listas_container">
        <ul class="ml_listas">
          <ListItem
            v-for="list in lists"
            :key="list.id"
            :name="list.name"
            :emoji="list.emoji"
            :detail="'TODO items completos'"
          >
            <v-menu>
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="text"
                  icon="mdi-dots-vertical"
                />
              </template>

              <!-- <v-list>
                <AddListDialog :product="product">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-list-item
                      v-bind="activatorProps"
                      prepend-icon="mdi-pencil-outline"
                      title="Modificar"
                    />
                  </template>
                </AddListDialog>
                <v-list-item
                  class="text-red"
                  prepend-icon="mdi-delete-outline"
                  title="Eliminar"
                  @click="store.deleteProduct(product.id)"
                />
              </v-list> -->
            </v-menu>
          </ListItem>
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
