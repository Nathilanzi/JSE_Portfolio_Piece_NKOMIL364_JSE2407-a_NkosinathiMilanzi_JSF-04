<template>
  <div class="spinner-container">
    <div class="spinner"></div>
    <LoadingSpinner v-if="isLoading" />
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.spinner {
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid #3498db;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
