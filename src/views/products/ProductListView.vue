<script setup lang="ts">
import { API } from '@/api/api';
import ListItem from '@/components/ListItem.vue';
import {
  productSchema,
  categorySchema,
  type Product,
  type Category,
} from '@/schemas/product.schema';
import { ref, onMounted } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

const products = ref([] as Product[]);
const categories = ref([] as Category[]);

const categoryName = ref('');
const categoryEmoji = ref('📦');

onMounted(async () => {
  products.value = productSchema
    .array()
    .parse(await API.get('products').withAuth().send());

  categories.value = categorySchema
    .array()
    .parse(await API.get('categories').withAuth().send());
});

function addProduct() {
  console.log('ass');
}

async function addCategory() {
  const res = await API.post('categories')
    .withAuth()
    .withBody({
      name: categoryName.value,
      metadata: { emoji: categoryEmoji.value },
    })
    .send();

  const newCategory = categorySchema.parse(res);
  categories.value.push(newCategory);
}
</script>

<template>
  <v-container max-width="800">
    <ul v-if="products.length">
      <li v-for="product in products" :key="product.id">
        {{ product.name }} ({{ product.category }})
      </li>
    </ul>

    <div v-else>no products</div>

    <ul v-if="categories.length">
      <ListItem
        v-for="category in categories"
        :key="category.id"
        :name="category.name"
        :emoji="category.emoji"
        :detail="`N items`"
      >
      </ListItem>
    </ul>

    <div v-else>no categories</div>

    <v-dialog max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          text="Agregar producto"
          prepend-icon="mdi-plus"
          variant="flat"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card variant="outlined" class="bg-surface" title="Agregar producto">
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn text="Cancelar" @click="isActive.value = false" />
            <v-btn
              variant="flat"
              text="Agregar"
              @click="
                addProduct();
                isActive.value = false;
              "
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          text="Agregar categoría"
          prepend-icon="mdi-plus"
          variant="flat"
        />
      </template>

      <template v-slot:default="{ isActive }">
        <v-card variant="outlined" class="bg-surface" title="Agregar categoría">
          <v-card-item>
            <div class="d-flex flex-column align-center py-2 ga-4">
              <v-menu :close-on-content-click="false" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :text="categoryEmoji"
                    variant="tonal"
                    :style="{ fontSize: '48px !important' }"
                    size="80"
                  />
                </template>

                <template v-slot:default="{ isActive }">
                  <emoji-picker
                    :native="true"
                    @select="
                      (emoji) => {
                        isActive.value = false;
                        categoryEmoji = emoji.i;
                      }
                    "
                  />
                </template>
              </v-menu>
              <v-text-field
                v-model="categoryName"
                label="Nombre"
                type="text"
                class="w-100"
              />
            </div>
          </v-card-item>

          <v-card-actions>
            <v-spacer />
            <v-btn text="Cancelar" @click="isActive.value = false" />
            <v-btn
              variant="flat"
              text="Agregar"
              @click="
                async () => {
                  await addCategory();
                  isActive.value = false;
                }
              "
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>
