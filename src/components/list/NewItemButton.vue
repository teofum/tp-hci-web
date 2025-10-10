<script setup lang="ts">
import { ref } from 'vue';
import NewItemPopup from '@/components/list/NewItemPopup.vue';

const newListPopupTrigger = ref(false);

function TogglePopup() {
  newListPopupTrigger.value = !newListPopupTrigger.value;
}

</script>

<template>
    <!--todo, poner un icono (+)-->
    <button class="nl-button" @click="() => TogglePopup()">
      <slot></slot>
    </button>
    <NewItemPopup v-if="newListPopupTrigger" 
          :TogglePopup="() => TogglePopup()"/>
</template>

<style scoped>
  button {
    color: #FFFFFF;
    background-color: #223030;
    border-radius: 20px;
    border: none;

    height: fit-content;
    width: fit-content;

    padding: 28px 26px ;

    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;

    position: fixed;
    right: 20%;
    bottom: 10%;
    z-index: 99;

    margin-right: 16px;

    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  }

  button:hover {
    opacity: 0.9;
  }
</style>

