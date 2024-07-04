<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/orders">Orders</router-link>
      <router-link to="/invoices">Invoices</router-link>
      <router-link to="/waste">Waste</router-link>
      <router-link to="/customers">Customers</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Add some basic styling */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 15px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
