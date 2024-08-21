<template>
  <div class="discount-carousel-container">
    <!-- Check if discounted products are available -->
    <div v-if="discountedProducts.length === 0">
      <p>No discounted products available.</p>
    </div>
    <div v-else class="carousel">
      <!-- Slides -->
      <div
        class="carousel-slide"
        v-for="(product, index) in discountedProducts"
        :key="product.id"
        :class="{ active: index === currentSlide }"
      >
        <div class="carousel-item bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-48 object-contain"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ product.title }}</h2>
            <p class="flex justify-between items-center mb-2">
              <span class="text-gray-500 line-through">{{ formatPrice(product.price) }}</span>
              <span class="text-red-600 font-bold">{{ formatPrice(product.discountedPrice) }}</span>
            </p>
            <p class="text-red-600 font-semibold mb-2">
              Save {{ product.discount }}%
            </p>
            <p class="text-gray-500 text-sm">
              Sale ends on: {{ product.saleEndDate }}
            </p>
            <router-link :to="`/product/${product.id}`">
              <button class="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button class="carousel-nav prev" @click="prevSlide">‹</button>
      <button class="carousel-nav next" @click="nextSlide">›</button>
    </div>
    
    <!-- View All Products Button -->
    <div class="w-full flex justify-center mt-4">
      <router-link :to="{ name: 'ProductList' }">
        <button class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          View All Products
        </button>
      </router-link>
    </div>
  </div>
</template>
