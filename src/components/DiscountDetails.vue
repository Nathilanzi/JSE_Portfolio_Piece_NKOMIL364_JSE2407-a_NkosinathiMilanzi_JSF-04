<template>
    <div v-if="product">
      <img :src="product.image" :alt="product.title" />
      <h1>{{ product.title }}</h1>
      <p class="original-price">${{ product.price.toFixed(2) }}</p>
      <p class="discounted-price">${{ product.discountedPrice }}</p>
      <p class="discount-percentage">-{{ product.discount }}%</p>
      <p class="sale-end-date">Sale ends on: {{ saleEndDate.toLocaleDateString() }}</p>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useDiscountStore } from '../Store/DiscountStore';
  
  const route = useRoute();
  const discountStore = useDiscountStore();
  
  const product = ref(null);
  const saleEndDate = ref(null);
  
