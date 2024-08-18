<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
  
        <div class="input-group">
          <label for="password">Password:</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
          <button type="button" @click="togglePasswordVisibility">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
  
        <div class="input-group">
          <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Logging in...' : 'Login' }}
          </button>
        </div>
      </form>
  
      <div v-if="loginError" class="error-message">
        {{ loginError }}
      </div>
    </div>
  </template>
  
