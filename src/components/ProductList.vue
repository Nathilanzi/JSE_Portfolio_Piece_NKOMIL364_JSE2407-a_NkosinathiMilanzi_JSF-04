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

// State variables
const products = ref([]);
const categories = ref([]);
const selectedCategory = ref('');
const selectedSort = ref('default');
const isLoading = ref(false);

// Router and route
const route = useRoute();
const router = useRouter();

/**
 * Fetches the product categories from the API and sets the categories state.
 */

// Function to fetch products based on category
const fetchProducts = async (category = '') => {
  isLoading.value = true;
  try {
    let url = 'https://fakestoreapi.com/products';
    if (category) {
      url += `/category/${category}`;
    }
    const response = await axios.get(url);
    products.value = response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Fetches the products based on the selected category from the API.
 */
// Function to fetch categories and initial products
onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    categories.value = ['All Categories', ...response.data];
    applyQueryParams();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
});

// Watcher for route changes to handle applied filters and sorting
watch(route, () => {
  applyQueryParams();
});

// Function to apply query parameters
const applyQueryParams = () => {
  const { category, sort } = route.query;
  selectedCategory.value = category || '';
  selectedSort.value = sort || 'default';
  fetchProducts(selectedCategory.value);
};

// Computed property for sorted products
const sortedProducts = computed(() => {
  let sorted = [...products.value];
  if (selectedSort.value === 'lowToHigh') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (selectedSort.value === 'highToLow') {
    sorted.sort((a, b) => b.price - a.price);
  }
  return sorted;
});

// Function to update filters and sorting
const updateFiltersAndSort = () => {
  router.push({ query: { category: selectedCategory.value, sort: selectedSort.value } });
  fetchProducts(selectedCategory.value);
};

// Function to reset filters
const resetFilters = () => {
  selectedCategory.value = '';
  selectedSort.value = 'default';
  router.push({ query: {} });
  fetchProducts();
};
</script>

<style scoped>
.filter-container {
  padding: 20px;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.reset-button {
  padding: 12px 24px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-button:hover {
  background-color: #c0392b;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
</style>
