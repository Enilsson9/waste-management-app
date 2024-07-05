<template>
    <div>
      <ul>
        <li v-for="customer in customers" :key="customer._id">
          {{ customer.name }} - {{ customer.description }} - {{ customer.category }}
          <button @click="deleteCustomer(customer._id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="createcustomer">
        <input v-model="newCustomer.name" placeholder="Name" required>
        <input v-model="newCustomer.description" placeholder="Description" required>
        <input v-model="newCustomer.category" placeholder="Category" required>

        <select v-model="newCustomer.category" id="customerCategory">
        <option v-for="customer in customerTypes" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
        </select>

        <button type="submit">Add customer</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        customers: [],
        newCustomer: {
          name: '',
          description: '',
          category: ''
        },
        customerTypes: [
        { id: 1, name: 'Regular' },
        { id: 2, name: 'Business' },
        { id: 3, name: 'Premium' },
        { id: 4, name: 'Internal' },
      ]
      };
    },
    methods: {
      async fetchCustomers() {
        try {
          const response = await api.getAll();
          this.customers = response.data;
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      },
      async createCustomer() {
        try {
          const response = await api.createCustomer(this.newcustomer);
          this.customers.push(response.data);
          this.newcustomer = { name: '', description: '', quantity: 0 };
        } catch (error) {
          console.error('Error creating customer:', error);
        }
      },
      async deleteCustomer(id) {
        try {
          await api.delete(id);
          this.customers = this.customers.filter(customer => customer._id !== id);
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      }
    },
    created() {
      this.fetchCustomers();
    }
  };
  </script>
  