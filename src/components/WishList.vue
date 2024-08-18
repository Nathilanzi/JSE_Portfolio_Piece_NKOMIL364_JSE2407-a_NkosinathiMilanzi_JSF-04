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

const getUserIdFromToken = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    try {
      console.log("JWT Token:", token);
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
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
    wishlistStore.loadWishlist();
  } else {
    router.push('/login');
  }
});

const updateWishlistItem = (item) => {
  wishlistStore.addItem({ ...item, quantity: item.quantity });
};

const removeItem = (itemId) => {
  wishlistStore.removeItem(itemId);
};

const clearWishlist = () => {
  wishlistStore.clearWishlist();
  alert("Wishlist cleared successfully!");
};

const wishlistItems = wishlistStore.wishlistItems;
const wishlistTotal = computed(()=> {
  return wishlistStore.wishlistItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toFixed(2);
})
</script>

<style scoped>
.wishlist-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.wishlist-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.wishlist-item img {
  max-width: 100px;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
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
