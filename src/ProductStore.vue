<!-- import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchProductsApi, getCategoriesApi } from '@/api';

export const useProductStore = defineStore('productStore', () => {
  const products = ref([]);
  const categories = ref([]);
  const filterItem = ref('All categories');
  const searchTerm = ref('');
  const error = ref(null);

  const fetchProducts = async () => {
    try {
      products.value = await fetchProductsApi(filterItem.value, searchTerm.value);
    } catch (err) {
      error.value = 'Data fetching failed, please check your network connection';
    }
  };

  const searchProducts = () => {
    fetchProducts();
  };

  const getCategories = async () => {
    try {
      categories.value = await getCategoriesApi();
      return { response: categories.value, error: null };
    } catch (err) {
      error.value = 'Error fetching categories';
      return { response: null, error: error.value };
    }
  };

  return {
    products,
    categories,
    filterItem,
    searchTerm,
    error,
    fetchProducts,
    searchProducts,
    getCategories,
    setFilterItem: (item) => (filterItem.value = item),
    setSearchTerm: (term) => (searchTerm.value = term),
  };
}); -->
