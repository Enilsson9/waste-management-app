<template>
    <div>
      <ul>
        <li v-for="invoice in invoices" :key="invoice._id">
          {{ invoice.order }} - {{ invoice.payment }} - {{ invoice.status }} - {{ invoice.createdAt }}
          <button @click="deleteInvoice(invoice._id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="createinvoice">
        <input v-model="newInvoice.name" placeholder="Order nr" required>
        <input v-model="newInvoice.payment" placeholder="Payment" required>
        <input v-model="newInvoice.status" type="number" placeholder="Status" required>
        <button type="submit">Add invoice</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        invoices: [],
        newinvoice: {
          name: '',
          payment: '',
          status: 0
        }
      };
    },
    methods: {
      async fetchinvoices() {
        try {
          const response = await api.getAll();
          this.invoices = response.data;
        } catch (error) {
          console.error('Error fetching invoices:', error);
        }
      },
      async createInvoice() {
        try {
          const response = await api.create(this.newinvoice);
          this.invoices.push(response.data);
          this.newinvoice = { name: '', description: '', quantity: 0 };
        } catch (error) {
          console.error('Error creating invoice:', error);
        }
      },
      async deleteInvoice(id) {
        try {
          await api.delete(id);
          this.invoices = this.invoices.filter(invoice => invoice._id !== id);
        } catch (error) {
          console.error('Error deleting invoice:', error);
        }
      }
    },
    created() {
      this.fetchinvoices();
    }
  };
  </script>
  