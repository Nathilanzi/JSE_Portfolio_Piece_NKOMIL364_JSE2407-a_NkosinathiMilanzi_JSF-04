<template>
  <div v-if="isAuthenticated" class="wishlist-container">
    <h1>Your Wishlist</h1>
    <div v-if="wishlistItems.length === 0">
      <p>Your wishlist is empty.</p>
    </div>
    <div v-else>
      <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
        <img :src="item.image" :alt="item.title" />
        <div class="item-details">
          <h3>{{ item.title }}</h3>
          <p>${{ item.price | currency }}</p>
        </div>
        <div class="quantity">
            <label for="quantity">Quantity:</label>
            <input type="number" v-model.number="item.quantity" min="1" @change="updateWishlisQuantity(item)" />
          </div>
        <button @click="removeItem(item.id)">Remove</button>
      </div>
      <div class="wishlist-total">
        <p>Total: ${{ wishlistTotal | $ }}</p>
        <button @click="clearWishlist">Clear Wishlist</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode'; 
import { useWishListStore } from '../Store/WishlistStore';

const router = useRouter();
const wishlistStore = useWishListStore();

const isAuthenticated = ref(false);

</script>

<style scoped>
/* Add any styles for the wishlist here */
</style> -->
