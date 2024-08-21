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
              <span class="text-black-500 line-through">{{ formatPrice(product.price) }}</span>
              <span class="text-red-600 font-bold">{{ formatPrice(product.discountedPrice) }}</span>
            </p>
            <p class="text-red-600 font-semibold mb-2">
              Save {{ product.discount }}%
            </p>
            <p class="text-black-500 text-sm">
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

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDiscountStore } from '../Store/DiscountStore';

const discountStore = useDiscountStore();
const currentSlide = ref(0); // Track the current slide

// Computed property for discounted products
const discountedProducts = computed(() => discountStore.discountedProducts);

// Format price utility function
const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;

// Navigate to the next slide
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % discountedProducts.value.length;
};

// Navigate to the previous slide
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + discountedProducts.value.length) % discountedProducts.value.length;
};

// Call the function to apply discounts and fetch products on component mount
onMounted(() => {
  discountStore.applyRandomDiscounts();
  console.log(discountStore.discountedProducts); // Debugging: Check the console
});
</script>

<style scoped>
.discount-carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  background-color: #ff6b6b;
}

.carousel-slide {
  min-width: 100%;
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}

.carousel-slide.active {
  opacity: 1;
  position: relative;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1000;
}

.carousel-nav.prev {
  left: 10px;
}

.carousel-nav.next {
  right: 10px;
}

.carousel-item {
  width: 100%;
  text-align: center;
}

/* Dark mode styles */
.dark-mode .carousel-item {
  background-color: #333;
  color: #fff;
}

.dark-mode .discounted-price {
  color: #ff6b6b;
}
</style>
