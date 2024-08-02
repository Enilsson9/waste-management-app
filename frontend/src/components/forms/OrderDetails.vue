<template>
  <div v-if="order">
    <div ref="printSection" class="order-details">
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {{ order.orderId }}</p>
      <p><strong>Customer:</strong> {{ order.customer.name }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      <p><strong>Total Price:</strong> {{ order.totalPrice }}</p>
      <p><strong>Created At:</strong> {{ new Date(order.timestamp).toLocaleString() }}</p>
      <h2>Items</h2>
      <ul>
        <li v-for="item in order.items" :key="item._id">
          {{ item.material.name }}: {{ item.weight }} lbs
        </li>
      </ul>
    </div>
    <button @click="goBack">Back to Orders</button>
    <button @click="downloadPdf">Download as PDF</button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
  
  <script>
  import api from '@/services/api';
  import html2pdf from 'html2pdf.js';
  
  export default {
    data() {
      return {
        order: null,
      };
    },
    created() {
      this.fetchOrderDetails();
    },
    methods: {
      async fetchOrderDetails() {
        try {
          const orderId = this.$route.params.orderId;
          const response = await api.getOrder(orderId);
          this.order = response.data;
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      },
      downloadPdf() {
       const element = this.$refs.printSection;
       html2pdf(element);
      },
      goBack() {
       this.$router.push({ name: 'orderList' });
      }
    },
  };
  </script>
  
  <style scoped>
  .order-details {
    padding: 20px;
  }
  </style>
  