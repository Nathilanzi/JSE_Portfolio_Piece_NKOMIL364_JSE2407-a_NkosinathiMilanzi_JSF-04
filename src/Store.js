// import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import axios from 'axios';

// export const useProductStore = defineStore('productStore', () => {
//   const products = ref([]);
//   const categories = ref([]);
//   const selectedCategory = ref('');
//   const selectedSort = ref('default');
//   const error = ref(null);

//   const fetchProducts = async () => {
//     try {
//       let url = 'https://fakestoreapi.com/products';
//       if (selectedCategory.value) {
//         url += `/category/${selectedCategory.value}`;
//       }
//       const response = await axios.get(url);
//       products.value = response.data;

//       if (selectedSort.value === 'lowToHigh') {
//         products.value.sort((a, b) => a.price - b.price);
//       } else if (selectedSort.value === 'highToLow') {
//         products.value.sort((a, b) => b.price - a.price);
//       }
//     } catch (err) {
//       error.value = 'Failed to fetch products';
//     }
//   };

//   const getCategories = async () => {
//     try {
//       const response = await axios.get('https://fakestoreapi.com/products/categories');
//       categories.value = response.data;
//     } catch (err) {
//       error.value = 'Failed to fetch categories';
//     }
//   };

//   return {
//     products,
//     categories,
//     selectedCategory,
//     selectedSort,
//     error,
//     fetchProducts,
//     getCategories,
//   };
// });
