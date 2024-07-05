<template>
    <div>
      <ul>
        <li v-for="order in orders" :key="order._id">
          {{ order.typeOfWaste }} - {{ order.weight }} - {{ order.createdAt }}
          <button @click="deleteOrder(order._id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="createOrder">
        

        <select v-model="newOrder.typeOfWaste" id="typeOfWaste">
        <option v-for="waste in wasteTypes" :key="waste.id" :value="waste.id">{{ waste.name }}</option>
        </select>


        <input v-model="newOrder.description" placeholder="Description" required>
        <input v-model="newOrder.quantity" type="number" placeholder="Quantity" required>
        <button type="submit">Add order</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        orders: [],
        newOrder: {
          typeOfWate: '',
          description: '',
          quantity: 0
        },
        wasteTypes: [
          { id: 1, name: 'Plastic' },
          { id: 2, name: 'Metal' },
          { id: 3, name: 'Cardboard' },
          { id: 4, name: 'Bronze' },
        ]
      };
    },
    methods: {
      async fetchorders() {
        try {
          const response = await api.getAll();
          this.orders = response.data;
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      },
      async createorder() {
        try {
          const response = await api.create(this.newOrder);
          this.orders.push(response.data);
          this.newOrder = { name: '', description: '', quantity: 0 };
        } catch (error) {
          console.error('Error creating order:', error);
        }
      },
      async deleteorder(id) {
        try {
          await api.delete(id);
          this.orders = this.orders.filter(order => order._id !== id);
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      }
    },
    created() {
      this.fetchOrders();
    }
  };
  </script>
  