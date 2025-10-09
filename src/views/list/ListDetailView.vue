<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ItemEntry from '@/components/list/ItemEntry.vue'
import NewItemButton from '@/components/list/NewItemButton.vue'
import ShareListPopup from '@/components/list/ShareListPopup.vue'

const groupByCategory = ref(false)

const router = useRouter()

function goBack() {
  router.push('/')
}

const sharePopupTrigger = ref(false)

function TogglePopup() {
  sharePopupTrigger.value = !sharePopupTrigger.value
}

</script>

<template>
  <div class="l-body">
    <button class="l-back-button" @click="goBack">← Mis Listas</button>
    <div class="l-main-container">
      <div class="div-title-share">
        <h1 class="l-titulo">Nombre de la lista</h1>
        <button class="l-share-button" @click="TogglePopup">
          <img src="https://cdn-icons-png.flaticon.com/256/512/512189.png"><!--todo: placeholder-->
        </button>
      </div>
      <input type="text" id="name" placeholder="Buscar productos" class="l-searchbar">
      <div class="l-filters">
        <button class="l-filter-dropdown">
          <span>Ordenar y Filtrar</span>
          <span class="chevron">▾</span>
        </button>
      
        <label class="l-group-toggle">
          <span class="label-text">Agrupar por categoría</span>
          <input type="checkbox" v-model="groupByCategory">
          <span class="l-switch" aria-hidden="true"></span>
        </label>
      </div>
      <div class="l-items-container">
        <ul class="l-categories">
            <li>
                <ul class="l_items">
                    <li>
                        <ItemEntry /> 
                    </li>
                </ul>
            </li>
        </ul>
      </div>
      <NewItemButton> + Nuevo Item </NewItemButton>
      <ShareListPopup  v-if="sharePopupTrigger" :TogglePopup="() => TogglePopup()" />
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
.l-body {
  /* todo colores en variables */ 
  color: black;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #EFEFE9;

  .l-back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background: none;
    border: none;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.3s ease;
  
    &:hover {
      opacity: 0.6;
    }
  }

  .l-main-container {
    width: 50%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 20px;

    .div-title-share {
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .l-titulo {
        font-size: 2rem;
        font-weight: 700;
        color: #000;
      }

      .l-share-button {
        padding: 0;
        width: 20px;
        height: 20px;
        background: none;
        border: none;
        cursor: pointer;
        transition: opacity 0.3s ease;

        img {
          width: 100%;
        }
      }
    }

    .l-searchbar {
      border: 1px solid #ece7df;
      border-radius: 8px;
      padding: 10px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      color: #223030;
    }

    .l-filters {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      padding: 10px 0;
    
      .l-filter-dropdown {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border: none;
        border-radius: 9999px;
        cursor: pointer;
        background: #D8D3CD;
        box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
        transition: opacity 0.2s ease;
      
        .chevron { line-height: 1; }
      
        &:hover { opacity: 0.85; }
      }
    
      .l-group-toggle {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        user-select: none;
      
        .label-text {
          /* mismo tono de texto que usás */
          color: #000;
          font-size: 0.9rem;
        }
      
        /* checkbox oculto */
        input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
          pointer-events: none;
        }
      
        /* switch visual */
        .l-switch {
          position: relative;
          width: 46px;
          height: 26px;
          border-radius: 9999px;
          background: #2e3f39; /* verde oscuro como en la captura */
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15);
          transition: background 0.2s ease;
        
          &::after {
            content: "";
            position: absolute;
            top: 3px;
            left: 3px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
            transition: transform 0.2s ease;
          }
        }
      
        /* estado checked */
        input:checked + .l-switch {
          background: #3b4f47;
        
          &::after {
            transform: translateX(20px);
          }
        }
      }
    }


    .l-items-container {
      width: 100%;

      display: flex;
      justify-content: center;
      align-items: baseline;

      .l-categories {
        /* list container for categories */
        width: 100%;
        list-style-type: none;
        padding: 0; 
        margin: 0;

        li {
          ul.l_items {
            width: 100%;
            list-style-type: none;
            padding: 0; 
            margin: 0;
          }
        }
      }

      .l_items {
        width: 100%;
        list-style-type: none;
        padding: 0; 
        margin: 0;
      }
    }
  }
}

p {
  font-size: 0.875rem;
  color: #000000a6;
  margin: 0;
  text-align: center;
}a {
  color: #000000a6;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}
</style>

