<template>
  <div class="filter-container">
    <div class="filters">
      <div class="filter-group">
        <label for="category-filter">Category:</label>
        <select id="category-filter" v-model="selectedCategory" @change="updateFiltersAndSort">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="price-filter">Sort by Price:</label>
        <select id="price-filter" v-model="selectedSort" @change="updateFiltersAndSort">
          <option value="default">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
    </select>
      </div>
      <button @click="resetFilters" class="reset-button">Reset Filters</button>
    </div>

    <div class="grid">
      <ProductCard
        v-for="product in sortedProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <LoadingSpinner v-if="isLoading" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from './ProductCard.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import axios from 'axios';
import { useCartStore } from '@/stores/cart';

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref('');
const selectedSort = ref('default');
const isLoading = ref(true);

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    products.value = response.data;
    applyFiltersAndSort();
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    categories.value = ['All Categories', ...response.data];
    applyQueryParams();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
});

watch(route, () => {
  applyQueryParams();
});

// Watch for changes in selectedCategory and fetch products accordingly
watch(selectedCategory, fetchProducts);

// Handler for category change
const onCategoryChange = () => {
  // Triggered when user selects a different category
  fetchProducts();
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
</style>
