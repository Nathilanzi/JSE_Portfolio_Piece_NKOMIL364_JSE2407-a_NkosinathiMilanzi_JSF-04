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
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  // State variables
  const username = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const isSubmitting = ref(false);
  const loginError = ref('');
  
  const router = useRouter();
  
  /**
   * Toggles the visibility of the password field.
   */
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  
  /**
   * Handles the login form submission.
   */
  const handleLogin = async () => {
    if (!username.value || !password.value) {
      loginError.value = 'Username and password are required.';
      return;
    }
  
    isSubmitting.value = true;
    loginError.value = '';
  
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username.value,
        password: password.value,
      }, {
        headers: {
          'Content-type': 'application/json',
        },
      });
  
      // Store the JWT token in localStorage
      localStorage.setItem('jwt', response.data.token);
  
      // Redirect to the intended page or the homepage
      const redirectTo = router.currentRoute.value.query.redirect || '/';
      router.push(redirectTo);
    } catch (error) {
      loginError.value = 'Login failed. Please check your credentials and try again.';
    } finally {
      isSubmitting.value = false;
    }
  };
  
  </script>
