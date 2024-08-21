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
