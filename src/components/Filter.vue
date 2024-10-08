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

const applyQueryParams = () => {
  const { category, sort } = route.query;
  selectedCategory.value = category || '';
  selectedSort.value = sort || 'default';
  fetchProducts(selectedCategory.value);
};


const applyFiltersAndSort = () => {
  let filteredProducts = [...products.value];
  if (selectedCategory.value) {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory.value);
  }

  if (selectedSort.value === 'lowToHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort.value === 'highToLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  sortedProducts.value = filteredProducts;
};

const updateFiltersAndSort = () => {
  router.push({ query: { category: selectedCategory.value, sort: selectedSort.value } });
  fetchProducts(selectedCategory.value);
};

const resetFilters = () => {
  selectedCategory.value = '';
  selectedSort.value = 'default';
  router.push({ query: {} });
  fetchProducts();
};
</script>
<!-- 
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

.card {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  padding: 15px;
  border-radius: 10px;
}

</style> -->
