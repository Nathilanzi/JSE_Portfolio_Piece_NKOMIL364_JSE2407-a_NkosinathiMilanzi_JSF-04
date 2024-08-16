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

// Reactive state variables
const categories = ref([]);
const products = ref([]);
const selectedCategory = ref('All categories');

// Fetch categories and initial products
const fetchCategories = async () => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/products/categories');
    categories.value = ['All categories', ...data];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const fetchProducts = async () => {
  try {
    let url = 'https://fakestoreapi.com/products';
    if (selectedCategory.value !== 'All categories') {
      url += `/category/${selectedCategory.value}`;
    }
    const { data } = await axios.get(url);
    products.value = data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};

// Fetch categories on mount
onMounted(() => {
  fetchCategories();
  fetchProducts();
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
