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

  // Function to apply random discounts to products
  const applyRandomDiscounts = () => {
    const selectedProducts = [...products.value].sort(() => 0.5 - Math.random()).slice(0, 5); // Select 5 random products
    selectedProducts.forEach(product => {
      const discountPercentage = Math.floor(Math.random() * 41) + 10; // Random discount between 10% and 50%
      product.discount = discountPercentage;
      product.discountedPrice = (product.price * (1 - discountPercentage / 100)).toFixed(2);
      product.saleEndDate = new Date(Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toLocaleDateString(); // Set sale end date
    });
    discountedProducts.value = selectedProducts;
  };

  return {
    products,
    discountedProducts,
    saleEndDate,
    categories,
    applyRandomDiscounts,
  };
});
