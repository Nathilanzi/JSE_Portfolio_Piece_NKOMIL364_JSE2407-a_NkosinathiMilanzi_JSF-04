<template>
    <div v-if="isAuthenticated">
      <h1>Comparison Page</h1>
      <button @click="clearComparison">Clear All</button>
      <table v-if="comparisonItems.length > 0">
        <thead>
          <tr>
          <th v-for="item in comparisonItems" :key="`title-${item.id}`">{{ item.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="item in comparisonItems" :key="'image-${item.id}'">
              <img :src="item.image" alt="Product Image" />
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="'description-${item.id}'">{{ item.description }}</td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="'price-${item.id}'">${{ item.price }}</td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="'rating-${item.id}'">{{ item.rating }}</td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="'remove-${item.id}'">
              <button @click="removeItem(item.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No items to compare.</p>
    </div>
    <p v-else>You must be logged in to view this page.</p>
  </template>
  
  <script>
  import { computed, onMounted, ref } from 'vue';
  import { useComparisonStore } from '../Store/ComparisonStore';

  
  export default {
    setup() {
      const comparisonStore = useComparisonStore();
    const isAuthenticated = ref(false);
      const comparisonItems = computed(() => comparisonStore.comparisonItems);
  
      function removeItem(itemId) {
        comparisonStore.removeItem(itemId);
      }
  
      function clearComparison() {
        comparisonStore.clearComparison();
      }
  
      // Load comparison items when component is mounted
      onMounted(() => {
        const token = localStorage.getItem("jwt");
      if (token) {
        isAuthenticated.value = true;
        comparisonStore.loadComparison();
        }
      });
  
      return {
        isAuthenticated,
        comparisonItems,
        removeItem,
        clearComparison,
      };
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  img {
    max-width: 100px;
  }
  button {
    margin: 5px;
  }
  </style>
  