import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode'; // Ensure this is uncommented if decoding is required

// Define the getUserIdFromToken function before using it
const getUserIdFromToken = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.sub;
  }
  return null;
};

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);  // Make sure this is defined
  const cartCount = computed(() => cartItems.value.reduce((total, item) => total + item.quantity, 0));
  
  const userId = getUserIdFromToken();

  const addItem = (item) => {
    const existingItem = cartItems.value.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartItems.value.push(item);
    }
    saveCart();
  };

  const saveCart = () => {
    if (userId) {
      localStorage.setItem(`cart-${userId}`, JSON.stringify(cartItems.value));
    }
  };

  const updateCart = (item) => {
    const existingItem = cartItems.value.find(i => i.id === item.id);
    if (existingItem) {
      Object.assign(existingItem, item);
    }
  };

  const loadCart = () => {
    if (userId) {
      const storedCart = localStorage.getItem(`cart-${userId}`);
      if (storedCart) {
        cartItems.value = JSON.parse(storedCart);
      }
    }
  };
  const clearCart = () => {
    cartItems.value = [];
    saveCart();
  };

  const removeItem = (itemId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== itemId);
    saveCart();
  };

  return { cartItems, cartCount, addItem, clearCart, removeItem, loadCart, updateCart };
});
