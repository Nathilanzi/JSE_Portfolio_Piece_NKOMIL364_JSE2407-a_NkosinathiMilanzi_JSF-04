<template>
  <div v-if="isAuthenticated" class="cart-container">
    <h2>Your Shopping Cart</h2>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" />
        <div class="item-details">
          <h3>{{ item.title }}</h3>
          <p>${{ item.price | currency }}</p>
          <div class="quantity">
            <label for="quantity">Quantity:</label>
            <input type="number" v-model.number="item.quantity" min="1" @change="updateCartQuantity(item)" />
          </div>
          <button @click="removeItem(item.id)">Remove</button>
        </div>
      </div>
      <div class="cart-total">
        <p>Total: ${{ cartTotal | $ }}</p>
        <button @click="clearCart">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode'; 
import { useCartStore } from '../Store/CartStore';

const router = useRouter();
const cartStore = useCartStore();

const isAuthenticated = ref(false);

const getUserIdFromToken = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub;
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem('jwt');
      router.push('/login');
    }
  }
  return null;
};

const userId = ref(getUserIdFromToken());

onMounted(() => {
  if (userId.value) {
    isAuthenticated.value = true;
    cartStore.loadCart();
  } else {
    router.push('/login');
  }
});

const updateCartQuantity = (item) => {
  cartStore.updateCart({ ...item, quantity: newQuantity });
};

const removeItem = (itemId) => {
  cartStore.removeItem(itemId);
};

const clearCart = () => {
  cartStore.clearCart();
  alert("Cart cleared successfully!");
};

const cartItems = cartStore.cartItems;
const cartTotal = computed(() => {
  return cartStore.cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toFixed(2);
});
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-item img {
  max-width: 100px;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
}

.quantity {
  display: flex;
  align-items: center;
}

.quantity input {
  width: 60px;
  margin-left: 10px;
}

.cart-total {
  margin-top: 20px;
  font-weight: bold;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #37a9f6;
}
</style>
