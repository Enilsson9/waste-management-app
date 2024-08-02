<template>
  <div v-if="customer && orders && invoices">
    <div class="customer-details">
      <h1>Customer History</h1>
      <h2>Orders:</h2>
      <p><strong>Customer:</strong> {{ customer.name }}</p>
      <div v-if="orders.length > 0">
        <ul>
          <li v-for="order in orders" :key="order._id">
            <router-link :to="{ name: 'OrderDetails', params: { orderId: order._id } }">
              {{ order.orderId }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No orders found for this customer.</p>
      </div>
      <h2>Invoices:</h2>
      <div v-if="invoices.length > 0">
        
        <ul>
          <li v-for="invoice in invoices" :key="invoice._id">
              {{ invoice.invoiceId }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No invoices found for this customer.</p>
      </div>
    </div>
    <button @click="goBack">Back to Customers</button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      customer: null,
      orders: null,
      invoices: null
    };
  },
  created() {
    this.fetchCustomerDetails();
    this.fetchCustomerOrders();
    this.fetchCustomerInvoices();
  },
  methods: {
    async fetchCustomerDetails() {
      try {
        const customerId = this.$route.params.customerId;
        const response = await api.getCustomer(customerId);
        this.customer = response.data;
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    },
    async fetchCustomerOrders() {
      try {
        const customerId = this.$route.params.customerId;
        const response = await api.getCustomerOrders(customerId);
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      }
    },
    async fetchCustomerInvoices() {
      try {
        const customerId = this.$route.params.customerId;
        const response = await api.getCustomerInvoices(customerId);
        this.invoices = response.data;
        console.log("invoices", response);
      } catch (error) {
        console.error('Error fetching customer invoices:', error);
      }
    },
    goBack() {
      this.$router.push({ name: 'customerList' });
    }
  },
};
</script>

<style scoped>
.customer-details {
  padding: 20px;
}
</style>
