// src/Store/ComparisonStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.sub;
  }
  return null;
};

export const useComparisonStore = defineStore('comparison', () => {
  const comparisonItems = ref([]);
  const comparisonCount = computed(() => comparisonItems.value.length);
  
  const userId = getUserIdFromToken();

  const addItem = (item) => {
    if (comparisonItems.value.length < 4) { // Limit to 4 items
      comparisonItems.value.push(item);
      saveComparison();
    } else {
      alert('You can only compare up to 4 items.');
    }
  };

  const updateComparison = (item) => {
    const existingItem = comparisonItems.value.find(i => i.id === item.id);
    if (existingItem) {
      Object.assign(existingItem, item);
    }
    saveComparison();
  };

  const loadComparison = () => {
    if (userId) {
      const storedComparison = localStorage.getItem(`comparison-${userId}`);
      if (storedComparison) {
        comparisonItems.value = JSON.parse(storedComparison);
      }
    }
  };

  const clearComparison = () => {
    comparisonItems.value = [];
    saveComparison();
  };

  const removeItem = (itemId) => {
    comparisonItems.value = comparisonItems.value.filter(item => item.id !== itemId);
    saveComparison();
  };

  const saveComparison = () => {
    if (userId) {
      localStorage.setItem(`comparison-${userId}`, JSON.stringify(comparisonItems.value));
    }
  };

  return { comparisonItems, comparisonCount, addItem, updateComparison, loadComparison, clearComparison, removeItem };
});