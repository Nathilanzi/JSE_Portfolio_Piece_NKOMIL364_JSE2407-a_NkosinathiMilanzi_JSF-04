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
import { useCartAndWishlist } from '../UseCartAndWishlist'

// Access cart from the custom hook
const { cart } = useCartAndWishlist();
</script>

<style scoped>
/* Add any styles for the cart here */
</style> -->
