<template>
  <div v-if="loading" class="loading-spinner-container">
    <LoadingSpinner />
  </div>
  <div v-else-if="product" class="product-details">
    <img :src="product.image" alt="Product Image" class="product-image" />
    <h1>{{ product.title }}</h1>
    <p>{{ product.category }}</p>
    <p>{{ product.description }}</p>
    <p>${{ product.price }}</p>
    <p>Ratings: {{ product.rating?.rate }}</p>
    <p>Reviews: {{ product.rating?.count }}</p>
    <button @click="goBack" class="back-button">Back to Products</button>
  </div>
</template>
