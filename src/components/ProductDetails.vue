<template>
  <div v-if="loading" class="loading-spinner-container">
    <LoadingSpinner />
  </div>
  <div v-else-if="product" class="product-details">
    <img :src="product.image" alt="Product Image" class="product-image" />
    <h1>{{ product.title }}</h1>
    <p>{{ product.category }}</p>
    <p>{{ product.description }}</p>
    <p class="original-price">${{ product.price.toFixed(2) }}</p>
    <p class="discounted-price">${{ product.discountedPrice }}</p>
    <p class="discount-percentage">-{{ product.discount }}%</p>
    <p class="sale-end-date">Sale ends on: {{ saleEndDate }}</p>
    <p>Ratings: {{ product.rating?.rate }}</p>
    <p>Reviews: {{ product.rating?.count }}</p>
    <button @click="addToCart">Add to Cart</button>
    <button @click="addToWishlist">Add to Wishlist</button>
    <button @click="addToComparison">Add to Comparison</button>
    <button @click="goBack" class="back-button">Back to Products</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner.vue';
import { useComparisonStore } from '../Store/ComparisonStore';

const comparisonStore = useComparisonStore();

const product = ref(null);
const loading = ref(true); // Initially true to show spinner while loading
const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.push({ path: '/', query: route.query });
};

const addToComparison = () => {
  comparisonStore.addItem({
    id: product.value.id,
    title: product.value.title,
    image: product.value.image,
    description: product.value.description,
    price: product.value.price,
    rating: product.value.rating?.rate,
  });
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

<style scoped>
.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.product-details {
  padding: 20px;
}

.product-image {
  max-width: 300px;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2980b9;
}
</style>
