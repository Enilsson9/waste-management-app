<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        const payload = {
          username: this.username,
          password: this.password
        };
  
        try {
          const response = await api.login(payload);
          // Handle successful login
          console.log('Login successful:', response.data);
          
          // Store token in local storage
          localStorage.setItem('authToken', response.data.token);
  
          // Redirect to a protected route
          this.$router.push({ name: 'WasteList' });
        } catch (error) {
          // Handle login error
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials and try again.');
        }
      },
      logout() {
        // Clear token from local storage
        localStorage.removeItem('authToken');
        // Redirect to login page
        this.$router.push('/');
      }
    }
  };
  </script>

  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  