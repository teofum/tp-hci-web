<script setup lang="ts">
import { API } from '@/api/api';
import { productSchema, type Product } from '@/schemas/product.schema';
import { ref, onMounted } from 'vue';

const products = ref<Product[]>([]);

onMounted(async () => {
  products.value = productSchema
    .array()
    .parse(await API.get('products').withAuth().send());
});
</script>

<template>
  <ul v-if="products.length">
    <li v-for="product in products" :key="product.id">
      {{ product.name }} ({{ product.category }})
    </li>
  </ul>

  <div v-else>no products</div>
</template>
