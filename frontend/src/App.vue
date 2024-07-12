<template>
  <div id="app">
    <header class="navbar">
      <h1 class="logo">Waste Management App</h1>
      <nav class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        <router-link to="/orders" class="nav-link" active-class="active">Orders</router-link>
        <router-link to="/invoices" class="nav-link" active-class="active">Invoices</router-link>
        <router-link to="/customers" class="nav-link" active-class="active">Customers</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
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
</style>
