<template>
  <div>
    <select v-model="selectedCategory" @change="onCategoryChange">
      <option v-for="category in categories" :key="category">
        {{ category }}
      </option>
    </select>

    <div class="grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import ProductCard from './ProductCard.vue';
import axios from 'axios';

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

