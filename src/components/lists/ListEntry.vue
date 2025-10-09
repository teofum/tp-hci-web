<script setup lang="ts">
import { ref } from 'vue'
import listSettingsPopup from './ListSettingsPopup.vue'

const props = defineProps({
  name: { type: String, default: 'nombre' },
  itemsCount: { type: Number, default: 0 },
  image: { type: String, default: '' }
})

const listSettingsPopupTrigger = ref(false)
function TogglePopup() { listSettingsPopupTrigger.value = !listSettingsPopupTrigger.value }
</script>

<template>
  <div class="le-body">
    <!-- fallback keeps your current placeholder -->
    <img class="le-image"
         :src="image || 'data:image/png;base64,iVBORw0K...SuQmCC'"
         alt="list" />
    <div class="le-data">
      <h2>{{ name }}</h2>
      <p>{{ itemsCount }} items</p>
    </div>
    <button class="le-button" @click="() => TogglePopup()">
      <img class="le-settings-icon" src="https://www.svgrepo.com/show/345223/three-dots-vertical.svg" alt="⋮">
    </button>
  </div>

  <listSettingsPopup v-if="listSettingsPopupTrigger" :TogglePopup="() => TogglePopup()" />
</template>

<style scoped>
.le-body{
  width: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px;

  .le-image{
    height: 60px;
    width: 60px;
    border-radius: 8px;
  }

  .le-button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

    .le-settings-icon{
      height: 40px;
      width: 40px;
    }
  }

  .le-button:focus {
    outline: none;
  }

  .le-data{
    width: 90%;
    padding: 0 5% 0 2%;

    text-align: left;

    p{
    text-align: left;
    }
  }
}
</style>
