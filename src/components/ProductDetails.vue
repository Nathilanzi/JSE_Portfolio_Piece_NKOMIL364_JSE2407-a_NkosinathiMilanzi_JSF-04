<template>
  <div v-if="loading" class="loading-spinner-container">
    <LoadingSpinner />
  </div>
  <div v-else-if="product" class="product-details">
    <img :src="product.image" alt="Product Image" class="product-image" />
    <h1>{{ product.title }}</h1>
    <p>{{ product.category }}</p>
    <p>{{ product.description }}</p>
    <p>${{ product.price }}</p>
    <p>Ratings: {{ product.rating?.rate }}</p>
    <p>Reviews: {{ product.rating?.count }}</p>
    <button @click="goBack" class="back-button">Back to Products</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner.vue';

const product = ref(null);
const loading = ref(true); // Initially true to show spinner while loading
const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.push({ path: '/', query: route.query });
};

onMounted(async () => {
  const productId = route.params.id;
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    product.value = response.data;
  } catch (error) {
    console.error('Failed to fetch product details:', error);
  } finally {
    loading.value = false; // Set loading to false after data fetch is complete
  }
});
</script>
