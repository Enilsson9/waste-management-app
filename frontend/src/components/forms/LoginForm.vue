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
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const router = useRouter();
      const username = ref('');
      const password = ref('');
  
      const login = async () => {
        const payload = { username: username.value, password: password.value };
  
        try {
          const response = await api.login(payload);
          console.log('Login response:', response.data);
  
          if (response.data && response.data.token && response.data.role) {
            // Store token and role in localStorage
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            
            // Redirect based on role
            switch (response.data.role) {
              case 'admin':
                router.push({ name: 'WasteList' }); 
                break;
              case 'cashier':
                router.push({ name: 'invoiceList' }); 
                break;
              case 'weigher':
                router.push({ name: 'orderList' });
                break;
              default:
                router.push('/'); // Redirect to login or a default page
            }
          } else {
            console.error('Invalid response format:', response.data);
          }
        } catch (error) {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials and try again.');
        }
      };
  
      return { username, password, login };
    }
  }
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
  