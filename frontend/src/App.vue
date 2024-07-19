<template>
  <div id="app">
    <header v-if="!isLoginPage" class="navbar">
      <h1 class="logo">Waste Management App</h1>
      <nav class="nav-links">
        <router-link to="/waste" class="nav-link" active-class="active">Waste</router-link>
        <router-link to="/orders" class="nav-link" active-class="active">Orders</router-link>
        <router-link to="/invoices" class="nav-link" active-class="active">Invoices</router-link>
        <router-link to="/customers" class="nav-link" active-class="active">Customers</router-link>
        <button @click="logout" class="logout-button">Logout</button>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isLoginPage = ref(route.path === '/'); // Initial check

    // Watch for changes in the route and update the isLoginPage
    watch(() => route.path, (newPath) => {
      isLoginPage.value = newPath === '/';
    });

    // Logout method
    function logout() {
      localStorage.removeItem('authToken'); // Clear token from local storage
      router.push('/'); // Redirect to login page
    }

    return { isLoginPage, logout };
  }
}
</script>

<style scoped>
/* Scoped styles to apply only to this component */


#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.navbar {
  background-color: #f8f9fa;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  margin: 0;
  color: #333;
}

.nav-links {
  display: flex;
}

.nav-link {
  font-weight: bold;
  color: #333;
  text-decoration: none;
  padding: 10px;
  margin: 0 10px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #42b983;
}

.active {
  color: #42b983;
}

.logout-button {
  background-color: #f56c6c; 
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
.logout-button:hover {
  background-color: #f44336; 
}



.nav-link.no-access {
  color: red;
  cursor: not-allowed;
  position: relative;
}

.nav-link.no-access::after {
  content: ' (No Access)';
  font-size: 0.8em;
  color: red;
  position: absolute;
  right: 0;
}
</style>
