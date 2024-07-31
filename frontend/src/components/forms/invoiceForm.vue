<template>
  <div class="container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Invoice ID</th>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Total Price</th>
          <th>Payment Method</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice._id" class="data-item">
          <td>{{ invoice.invoiceId }}</td>
          <td>{{ invoice.orderId ? invoice.orderId.orderId : 'N/A' }}</td>
          <td>{{ invoice.orderId && invoice.orderId.customer ? invoice.orderId.customer.name : 'N/A' }}</td>
          <td>{{ invoice.orderId ? invoice.orderId.totalPrice : 'N/A' }}</td>
          <td>{{ invoice.paymentMethod }}</td>
          <td>{{ invoice.status }}</td>
          <td>{{ new Date(invoice.timestamp).toLocaleString() }}</td>
          <td class="action-buttons">
            <button class="btn edit-btn" @click="editInvoice(invoice)">Edit</button>
            <button class="btn delete-btn" @click="confirmDeleteInvoice(invoice)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Toggle Add New Invoice Button -->
    <button v-if="!showForm" class="btn add-btn" @click="toggleForm(true)">Add New Invoice</button>

    <!-- Invoice Form -->
    <form v-if="showForm" @submit.prevent="submitForm" class="data-form">
      <select v-model="newInvoice.orderId" required class="input-field">
        <option value="" disabled>Select Order</option>
        <option v-for="order in orders" :key="order._id" :value="order._id">{{ order.orderId }}</option>
      </select>
      <select v-model="newInvoice.paymentMethod" required class="input-field">
        <option value="" disabled>Select Payment Method</option>
        <option value="cash">Cash</option>
        <option value="credit_card">Credit Card</option>
        <option value="bank_transfer">Bank Transfer</option>
        <option value="mobile_payment">Mobile Payment</option>
      </select>
      <select v-model="newInvoice.status" required class="input-field">
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <div class="form-buttons">
        <button type="submit" class="btn submit-btn">{{ isEditing ? 'Update' : 'Add' }} Invoice</button>
        <button type="button" @click="cancelEdit" class="btn cancel-btn">Cancel</button>
      </div>
    </form>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <p>Are you sure you want to delete this invoice?</p>
        <div class="modal-buttons">
          <button class="btn confirm-delete-btn" @click="deleteInvoice">Yes, Delete</button>
          <button class="btn cancel-btn" @click="closeDeleteModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      invoices: [],
      orders: [],
      newInvoice: {
        orderId: '',
        paymentMethod: '',
        status: 'unpaid'
      },
      showForm: false,
      showDeleteModal: false,
      deleteInvoiceId: null,
      isEditing: false,
      editInvoiceId: null
    };
  },
  created() {
    this.fetchInvoices();
    this.fetchOrders();
  },
  methods: {
    async fetchInvoices() {
      try {
        const response = await api.getAllInvoices();
        this.invoices = response.data;
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    },
    async fetchOrders() {
      try {
        const response = await api.getAllOrders();
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    toggleForm(show) {
      console.log('Toggle form:', show); // Debugging log
      this.showForm = show;
      if (!show) {
        this.resetForm();
      }
    },
    async submitForm() {
      console.log('Submitting form:', this.newInvoice); // Debugging log
      if (this.isEditing) {
        await this.updateInvoice();
      } else {
        await this.createInvoice();
      }
    },
    async createInvoice() {
      try {
        console.log('Creating invoice:', this.newInvoice); // Debugging log
        const response = await api.createInvoice(this.newInvoice);
        console.log('Invoice created:', response.data); // Debugging log
        this.invoices.push(response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error creating invoice:', error);
      }
    },
    async updateInvoice() {
      try {
        console.log('Updating invoice:', this.newInvoice); // Debugging log
        const response = await api.updateInvoice(this.editInvoiceId, this.newInvoice);
        console.log('Invoice updated:', response.data); // Debugging log
        const index = this.invoices.findIndex(invoice => invoice._id === this.editInvoiceId);
        if (index !== -1) {
          this.invoices.splice(index, 1, response.data);
        }
        this.resetForm();
      } catch (error) {
        console.error('Error updating invoice:', error);
      }
    },
    async deleteInvoice() {
      try {
        await api.deleteInvoice(this.deleteInvoiceId);
        this.invoices = this.invoices.filter(invoice => invoice._id !== this.deleteInvoiceId);
        this.closeDeleteModal();
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    },
    confirmDeleteInvoice(invoice) {
      this.showDeleteModal = true;
      this.deleteInvoiceId = invoice._id;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.deleteInvoiceId = null;
    },
    editInvoice(invoice) {
      this.newInvoice = {
        orderId: invoice.orderId._id,
        paymentMethod: invoice.paymentMethod,
        status: invoice.status
      };
      this.editInvoiceId = invoice._id;
      this.isEditing = true;
      this.showForm = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.newInvoice = {
        orderId: '',
        paymentMethod: '',
        status: 'unpaid'
      };
      this.isEditing = false;
      this.editInvoiceId = null;
      this.showForm = false;
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>
