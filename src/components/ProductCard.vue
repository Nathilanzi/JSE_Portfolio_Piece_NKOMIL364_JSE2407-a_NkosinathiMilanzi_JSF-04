<template>
  <div class="product-card" @click="navigateToDetail">
    <img :src="product.image" alt="Product Image" class="product-image" />
    <h3>{{ product.title }}</h3>
    <p>${{ product.price }}</p>
    <p>{{ product.category }}</p>
    <p>Ratings: {{ product.rating.rate }}</p>
    <p>Reviews: {{ product.rating.count }}</p>
        <!-- Buttons for Adding to Cart and Wishlist -->
        <button @click="handleAddToCart" class="add-button">Add to Cart</button>
    <button @click="handleAddToWishlist" class="add-button">Add to Wishlist</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useCartAndWishlist } from '../UseCartAndWishlist';

const {
  addToCart,
  addToWishlist
} = useCartAndWishlist();

// Function to handle adding to the cart
const handleAddToCart = () => {
  addToCart(product.value);
};

// Function to handle adding to the wishlist
const handleAddToWishlist = () => {
  addToWishlist(product.value);
};

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const navigateToDetail = () => {
  router.push({ name: 'ProductDetails', params: { id: props.product.id } });
};
</script>
