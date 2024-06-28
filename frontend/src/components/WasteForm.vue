<template>
    <div>
      <ul>
        <li v-for="waste in wastes" :key="waste._id">
          {{ waste.name }} - {{ waste.description }} - {{ waste.quantity }}
          <button @click="deleteWaste(waste._id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="createWaste">
        <input v-model="newWaste.name" placeholder="Name" required>
        <input v-model="newWaste.description" placeholder="Description" required>
        <input v-model="newWaste.quantity" type="number" placeholder="Quantity" required>
        <button type="submit">Add Waste</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        wastes: [],
        newWaste: {
          name: '',
          description: '',
          quantity: 0
        }
      };
    },
    methods: {
      async fetchWastes() {
        try {
          const response = await api.getAll();
          this.wastes = response.data;
        } catch (error) {
          console.error('Error fetching wastes:', error);
        }
      },
      async createWaste() {
        try {
          const response = await api.create(this.newWaste);
          this.wastes.push(response.data);
          this.newWaste = { name: '', description: '', quantity: 0 };
        } catch (error) {
          console.error('Error creating waste:', error);
        }
      },
      async deleteWaste(id) {
        try {
          await api.delete(id);
          this.wastes = this.wastes.filter(waste => waste._id !== id);
        } catch (error) {
          console.error('Error deleting waste:', error);
        }
      }
    },
    created() {
      this.fetchWastes();
    }
  };
  </script>
  