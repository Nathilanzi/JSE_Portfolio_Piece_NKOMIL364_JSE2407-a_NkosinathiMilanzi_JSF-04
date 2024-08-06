import { ref, computed } from 'vue';
import axios from 'axios';

// Define the composable
export function useCartAndWishlist() {
  // Reactive state for cart and wishlist
  const cart = ref([]);
  const wishlist = ref([]);

  // Fetch initial data (if needed)
  const fetchInitialData = async () => {
    try {
      // Example of fetching initial cart and wishlist data
      const cartResponse = await axios.get('/api/cart');
      const wishlistResponse = await axios.get('/api/wishlist');
      
      cart.value = cartResponse.data;
      wishlist.value = wishlistResponse.data;
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    }
  };

  // Add a product to the cart
  const addToCart = (product) => {
    cart.value.push(product);
    // Optionally, send a request to the server to update the cart
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(product => product.id !== productId);
    // Optionally, send a request to the server to update the cart
  };

  // Add a product to the wishlist
  const addToWishlist = (product) => {
    wishlist.value.push(product);
    // Optionally, send a request to the server to update the wishlist
  };

  // Remove a product from the wishlist
  const removeFromWishlist = (productId) => {
    wishlist.value = wishlist.value.filter(product => product.id !== productId);
    // Optionally, send a request to the server to update the wishlist
  };

  // Computed properties
  const cartItemCount = computed(() => cart.value.length);
  const wishlistItemCount = computed(() => wishlist.value.length);

  // Fetch initial data when the composable is used
  fetchInitialData();

  // Return the reactive state and methods
  return {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    cartItemCount,
    wishlistItemCount,
  };
}
