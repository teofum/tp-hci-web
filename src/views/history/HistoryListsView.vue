<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';



const store = useStore();
//const { lists } = storeToRefs(store);




</script>


<template>
    <v-container max-width="800" class="container">
      <div class="d-flex flex-row justify-space-between align-center w-100">
        <h1 class="heading text-high-emphasis">Historial</h1>
      </div>
    </v-container>

</template>


<style scoped>
.heading {
  font-size: 3rem;
  font-weight: 700;
}
</style>

