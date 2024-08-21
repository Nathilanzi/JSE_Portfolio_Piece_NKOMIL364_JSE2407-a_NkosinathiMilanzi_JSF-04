<template>
    <div>
      <button @click="toggleTheme">
        Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  
  const theme = ref(localStorage.getItem('theme') || 'light');
  
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  };
  
  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  });
  
  onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme.value);
  });
  </script>
