<template>
  <div class="product-card" >
    <img :src="product.image" alt="Product Image" class="product-image" @click="navigateToDetail"/>
    <h3 @click="navigateToDetail">{{ product.title }}</h3>
    <p @click="navigateToDetail">${{ product.price }}</p>
    <p>{{ product.category }}</p>
    <p>Ratings: {{ product.rating.rate }}</p>
    <p>Reviews: {{ product.rating.count }}</p>
    <p v-if="product.discountedPrice" class="original-price">${{ product.price.toFixed(2) }}</p>
    <p v-if="product.discountedPrice" class="discounted-price">${{ product.discountedPrice }}</p>
    <p v-if="product.discountedPrice" class="discount-percentage">-{{ product.discount }}%</p>
    <p v-else>${{ product.price.toFixed(2) }}</p>
        <!-- Buttons for Adding to Cart, Wishlist and Comparison -->
        <button @click.stop="addToCart" class="add-button">Add to Cart</button>
        <button @click.stop="addToWishlist" class="add-button">Add to Wishlist</button>
        <button @click.stop="toggleComparison" class="add-button">
      {{ isInComparison ? "Remove from Compare" : "Add to Compare" }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../Store/CartStore';
import { useWishListStore } from '../Store/WishlistStore';
import { useComparisonStore } from '../Store/ComparisonStore';


const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();

const addToCart = () => {
  cartStore.addItem({
    ...props.product,
    quantity: 1 // Default quantity to 1
  });
  alert(`${props.product.title} added to cart!`);
};

const wishlistStore = useWishListStore();

const addToWishlist = () => {
  wishlistStore.addItem({
    ...props.product,
    quantity: 1
  })
  alert(`${props.product.title} added to wishlist!`);
};

const comparisonStore = useComparisonStore();

const isInComparison = computed(() => {
  return comparisonStore.comparisonItems.some(item => item.id === props.product.id);
});


const toggleComparison = () => {
  if (isInComparison.value) {
    comparisonStore.removeItem(props.product.id);
    alert(`${props.product.title} removed from comparison!`);
  } else {
    comparisonStore.addItem(props.product);
    alert(`${props.product.title} added to comparison!`);
  }
};

const router = useRouter();

/**
 * Navigates to the product detail page.
 */
const navigateToDetail = () => {
  router.push({ name: 'ProductDetails', params: { id: props.product.id } });
};
</script>

<style scoped>
.product-card {
  border: 4px solid var(--border-color);
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: var(--background-color);
  color: var(--text-color);
}

/* .product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--hover-background-color);
} */

.product-image {
  width: 100%;
  margin-bottom: 16px;
  object-fit: contain;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.add-button {
  padding: 10px;
  background-color: #d61414;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  flex: 1;
  margin: 0 5px;
  max-width: 120px;
  text-align: center;
}

.add-button:hover {
  background-color: #800606;
}

.card {
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Light mode colors */
:root {
  --border-color: #261d5c;
  --background-color: bisque;
  --text-color: #000;
  --hover-background-color: #ffe4c4;
}

/* Dark mode colors */
.dark-mode {
  --border-color: #1b1340;
  --background-color: #3e3e3e;
  --text-color: #fff;
  --hover-background-color: #5a5a5a;
}
</style>

