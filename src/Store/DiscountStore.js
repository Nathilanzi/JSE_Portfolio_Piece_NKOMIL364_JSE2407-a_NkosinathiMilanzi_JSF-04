import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useDiscountStore = defineStore('discount', () => {
  const products = ref([]);
  const discountedProducts = ref([]);
  const saleEndDate = ref(null);
  const categories = ref([]);

  // Fetch categories and products when the store is initialized
  onMounted(async () => {
    try {
      // Fetch categories
      const categoryResponse = await fetch('https://fakestoreapi.com/products/categories');
      if (!categoryResponse.ok) {
        throw new Error(`Failed to fetch categories: ${categoryResponse.statusText}`);
      }
      const categoryData = await categoryResponse.json();
      categories.value = ['All Categories', ...categoryData];

      // Fetch products
      const productsResponse = await fetch('https://fakestoreapi.com/products');
      if (!productsResponse.ok) {
        throw new Error(`Failed to fetch products: ${productsResponse.statusText}`);
      }
      const productData = await productsResponse.json();
      products.value = productData;

      // Apply discounts after fetching products
      applyRandomDiscounts();
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  });
