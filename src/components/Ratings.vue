<!-- <template>
  <div class="text-gray-900">
    <span v-for="star in stars" :key="star" class="inline-block">
      <svg
        v-if="star <= rating"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="w-5 h-5 text-yellow-400"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.435 8.2 1.191-5.934 5.783 1.4 8.175L12 18.902l-7.334 3.843 1.4-8.175-5.934-5.783 8.2-1.191z" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="w-5 h-5 text-gray-300"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.435 8.2 1.191-5.934 5.783 1.4 8.175L12 18.902l-7.334 3.843 1.4-8.175-5.934-5.783 8.2-1.191z" />
      </svg>
    </span>
    <span class="ml-2">{{ rating.toFixed(1) }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Define props
const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
});

// Computed property for the star list
const stars = computed(() => [1, 2, 3, 4, 5]);
</script>

<style scoped>
/* You can add additional scoped styles here if needed */
</style> -->
