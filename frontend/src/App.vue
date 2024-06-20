<!-- src/App.vue -->
<template>
  <div id="app">
    <header>
      <h1>{{ message }}</h1>
    </header>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      message: 'Loading...'
    };
  },
  created() {
    axios.get('http://localhost:3001/')
      .then(response => {
        this.message = response.data.hello;
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }
};
</script>

<style>
/* Add your styles here */
</style>
