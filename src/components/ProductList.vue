<template>
  <div class="filter-container">
    <div class="filters">
      <div class="filter-group">
        <label for="category-filter">Category:</label>
        <select id="category-filter" v-model="selectedCategory" @change="updateFiltersAndSort">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="price-filter">Sort by Price:</label>
        <select id="price-filter" v-model="selectedSort" @change="updateFiltersAndSort">
          <option value="default">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
      <button @click="resetFilters" class="reset-button">Reset Filters</button>
    </div>

    <div class="grid">
      <ProductCard
        v-for="product in sortedProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <LoadingSpinner v-if="isLoading" />
  </div>
</template>
