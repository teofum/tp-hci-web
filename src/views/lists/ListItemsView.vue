<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import ItemEntry from '@/components/list/ItemEntry.vue';
import NewItemButton from '@/components/list/NewItemButton.vue';
import ShareListPopup from '@/components/list/ShareListPopup.vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';
import AddItemDialog from '@/components/products/AddProductDialog.vue';
import ListItem from '@/components/ListItem.vue';

const store = useStore();

const router = useRouter();

function goBack() {
  router.push('/');
}

const sharePopupTrigger = ref(false);

function TogglePopup() {
  sharePopupTrigger.value = !sharePopupTrigger.value;
}

// TODO debug
const { products } = storeToRefs(store); // TODO esto cambiarlo a productos dentro de la lista en sí

const filter = ref('');
const groupByCategory = ref(true);

const filteredProducts = computed(() =>
  products.value.filter(
    (product) =>
      !filter.value ||
      product.name.toLowerCase().includes(filter.value.toLowerCase()),
  ),
);

const productsByCategory = computed(() => {
  const categories: Record<number, [string, typeof products.value]> = {};
  for (const product of filteredProducts.value) {
    const catId = product.category?.id ?? -1;

    if (!categories[catId]) {
      const catName = product.category?.name ?? 'Sin categoría';
      categories[catId] = [catName, []];
    }

    categories[catId][1].push(product);
  }

  return categories;
});
</script>

<template>
  <div class="l-body">
    <button class="l-back-button" @click="goBack">← Mis Listas</button>
    <div class="l-main-container">
      <div class="div-title-share">
        <h1 class="l-titulo">Nombre de la lista</h1>
        <button class="l-share-button" @click="TogglePopup">
          <img
            src="https://cdn-icons-png.flaticon.com/256/512/512189.png"
          /><!--todo: placeholder-->
        </button>
      </div>
      <input
        type="text"
        id="name"
        placeholder="Buscar productos"
        class="l-searchbar"
      />
      <div class="l-filters">
        <button class="l-filter-dropdown">
          <span>Ordenar y Filtrar</span>
          <span class="chevron">▾</span>
        </button>

        <label class="l-group-toggle">
          <span class="label-text">Agrupar por categoría</span>
          <input type="checkbox" v-model="groupByCategory" />
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
      <ShareListPopup
        v-if="sharePopupTrigger"
        :TogglePopup="() => TogglePopup()"
      />
    </div>
  </div>

  <!-- new structure, TODO ir migrando lo de arriba acá  -->

  <v-container max-width="800" class="container">
    <v-btn @click="goBack" variant="text" prepend-icon="mdi-chevron-left">Listas</v-btn>
    <div class="d-flex flex-row justify-space-between align-center w-100">
      <h1 class="heading text-high-emphasis">TODO nombre lista</h1>
    </div>

    <div class="d-flex flex-column ga-2 my-4">
      <v-text-field
        v-model="filter"
        label="Buscar"
        type="text"
        class="w-100"
        clearable
        clear-icon="mdi-close-circle-outline"
      />
      <v-switch
        v-model="groupByCategory"
        label="Agrupar por categoría"
        inset
        color="primary"
        class="switch"
      />
    </div>

    <div v-if="groupByCategory">
      <div
        v-for="[key, [categoryName, products]] in Object.entries(
          productsByCategory,
        )"
        :key="key"
      >
        <h2 class="text-medium-emphasis mt-3 category-heading">
          {{ categoryName }}
        </h2>

        <ul>
          <ListItem
            v-for="product in products"
            :key="product.id"
            :name="product.name"
            :emoji="product.emoji"
            :detail="product.category?.name ?? 'Sin categoría'"
          >
            <v-menu>
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="text"
                  icon="mdi-dots-vertical"
                />
              </template>

              <v-list>
                <AddProductDialog :product="product">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-list-item
                      v-bind="activatorProps"
                      prepend-icon="mdi-pencil-outline"
                      title="Modificar"
                    />
                  </template>
                </AddProductDialog>
                <v-list-item
                  class="text-red"
                  prepend-icon="mdi-delete-outline"
                  title="Eliminar"
                  @click="store.deleteProduct(product.id)"
                />
              </v-list>
            </v-menu>
          </ListItem>
        </ul>
      </div>
    </div>
    <div v-else>
      <ul>
        <ListItem
          v-for="product in filteredProducts"
          :key="product.id"
          :name="product.name"
          :emoji="product.emoji"
          :detail="product.category?.name ?? 'Sin categoría'"
        >
          <v-menu>
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                variant="text"
                icon="mdi-dots-vertical"
              />
            </template>

            <v-list>
              <AddProductDialog :product="product">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-list-item
                    v-bind="activatorProps"
                    prepend-icon="mdi-pencil-outline"
                    title="Modificar"
                  />
                </template>
              </AddProductDialog>
              <v-list-item
                class="text-red"
                prepend-icon="mdi-delete-outline"
                title="Eliminar"
                @click="store.deleteProduct(product.id)"
              />
            </v-list>
          </v-menu>
        </ListItem>
      </ul>
    </div>

    <div
      v-if="
        Object.keys(productsByCategory).length === 0 ||
        filteredProducts.length === 0
      "
    >
      No hay productos
    </div>

    <AddItemDialog>
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          app
          location="bottom end"
          size="x-large"
          text="Agregar item"
          prepend-icon="mdi-plus"
          variant="flat"
        />
      </template>
    </AddItemDialog>
  </v-container>
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
  position: relative;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #efefe9;

  .l-back-button {
    position: absolute;
    top: 30px;
    left: 10%;
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

    margin-top: 60px;

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
        background: #d8d3cd;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
        transition: opacity 0.2s ease;

        .chevron {
          line-height: 1;
        }

        &:hover {
          opacity: 0.85;
        }
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
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
          transition: background 0.2s ease;

          &::after {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
}
a {
  color: #000000a6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
.heading {
  font-size: 3rem;
  font-weight: 700;
}

.category-heading {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>

<style>
.switch {
  .v-selection-control {
    flex-direction: row-reverse !important;

    .v-label {
      padding-inline-start: 0;
      padding-inline-end: 10px;
    }
  }
}
</style>
