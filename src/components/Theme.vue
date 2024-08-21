<template>
    <div>
      <button @click="toggleTheme">
        Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
      </button>
    </div>
  </template>
