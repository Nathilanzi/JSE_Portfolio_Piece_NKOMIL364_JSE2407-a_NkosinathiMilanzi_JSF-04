<template>
  <div class="product-card" >
    <img :src="product.image" alt="Product Image" class="product-image" @click="navigateToDetail"/>
    <h3 @click="navigateToDetail">{{ product.title }}</h3>
    <p @click="navigateToDetail">${{ product.price }}</p>
    <p>{{ product.category }}</p>
    <p>Ratings: {{ product.rating.rate }}</p>
    <p>Reviews: {{ product.rating.count }}</p>
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
  border: 1px solid #ddd;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 16px;
}

.add-button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #2980b9;
}
</style>
