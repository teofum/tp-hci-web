<script setup lang="ts">
import { ref } from 'vue'

const listSettingsPopupTrigger = ref(false)
const isChecked = ref(false)

function TogglePopup() {
  listSettingsPopupTrigger.value = !listSettingsPopupTrigger.value
}
</script>

<template>
  <div class="ie-body" :class="{ 'ie-checked': isChecked }">
    <!--todo: put image from db-->
    <img class="ie-image" src="https://tse3.mm.bing.net/th/id/OIP.kori7Y8NQzmHi4RLlD-T9AHaE5?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3">
    
    <div class="ie-data">
      <h2>nombre</h2>
      <p>number of items</p>
    </div>

    <input type="checkbox" class="ie-checkbox" v-model="isChecked" />

    <button class="ie-button" @click="() => TogglePopup()">
      <img class="ie-settings-icon" src="https://www.svgrepo.com/show/345223/three-dots-vertical.svg">
    </button>
    
    <itemSettingsPopup v-if="listSettingsPopupTrigger" :TogglePopup="() => TogglePopup()"/>
  </div>
</template>


<style scoped>
.ie-body {
    
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 10px;
  gap: 10px;
  transition: opacity 0.3s ease, filter 0.3s ease;

  &.ie-checked {
    opacity: 0.6;
    filter: grayscale(40%);

    .ie-data h2 {
      text-decoration: line-through;
      color: #777;
    }
  }

  .ie-checkbox {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1px solid #999;
    cursor: pointer;
    accent-color: #777; /* native color tweak */
    margin-right: 6px;
  }

  .ie-image {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
  }

    .ie-data {
    flex: 1;
    text-align: left;
    
    h2 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      margin: 0;
      color: #555;
      font-size: 0.9rem;
    }
  }


  .ie-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .ie-settings-icon {
      width: 18px;
      height: 18px;
      display: block;
    }
  }
}
.ie-body .ie-data p {
  text-align: left !important;
}
</style>
