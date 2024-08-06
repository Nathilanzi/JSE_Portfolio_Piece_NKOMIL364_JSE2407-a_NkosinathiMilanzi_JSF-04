<template>
  <div>
    <select v-model="selectedCategory" @change="onCategoryChange">
      <option v-for="category in categories" :key="category">
        {{ category }}
      </option>
    </select>

    <div class="grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
