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
