<template>
  <div class="container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice._id" class="data-item">
          <td>{{ invoice.order }}</td>
          <td>{{ invoice.payment }}</td>
          <td>{{ invoice.status }}</td>
          <td>{{ invoice.createdAt }}</td>
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
      <input v-model="newInvoice.order" type="number" placeholder="Order nr" required class="input-field">

      <select v-model="newInvoice.payment" class="input-field">
        <option v-for="paymentType in paymentTypes" :key="paymentType.id" :value="paymentType.name">
          {{ paymentType.name }}
        </option>
      </select>

      <select v-model="newInvoice.status" class="input-field">
        <option v-for="statusType in statusTypes" :key="statusType.id" :value="statusType.name">
          {{ statusType.name }}
        </option>
      </select>

      <div class="form-buttons">
        <button type="submit" class="btn submit-btn">{{ isEditing ? 'Update' : 'Add' }} Invoice</button>
        <button type="button" @click="cancelEdit" v-if="isEditing" class="btn cancel-btn">Cancel</button>
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
      newInvoice: {
        order: '',
        payment: '',
        status: ''
      },
      paymentTypes: [
        { id: 1, name: 'Paypal' },
        { id: 2, name: 'Credit card' },
        { id: 3, name: 'Cash' },
        { id: 4, name: 'Bank' }
      ],
      statusTypes: [
        { id: 1, name: 'Paid' },
        { id: 2, name: 'Unpaid' },
        { id: 3, name: 'Partially paid' },
        { id: 4, name: 'Cancelled' }
      ],
      showForm: false,
      showDeleteModal: false,
      deleteInvoiceId: null,
      isEditing: false
    };
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
    toggleForm(show) {
      this.showForm = show;
      if (!show) {
        this.resetForm();
      }
    },
    async submitForm() {
      if (this.isEditing) {
        await this.updateInvoice();
      } else {
        await this.createInvoice();
      }
    },
    async createInvoice() {
      try {
        const response = await api.createInvoice(this.newInvoice);
        this.invoices.push(response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error creating invoice:', error);
      }
    },
    async updateInvoice() {
      try {
        await api.updateInvoice(this.editInvoiceId, this.newInvoice);
        const index = this.invoices.findIndex(invoice => invoice._id === this.editInvoiceId);
        if (index !== -1) {
          this.invoices.splice(index, 1, { ...this.newInvoice, _id: this.editInvoiceId });
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
      this.newInvoice = { ...invoice };
      this.editInvoiceId = invoice._id;
      this.isEditing = true;
      this.showForm = true;
    },
    resetForm() {
      this.isEditing = false;
      this.newInvoice = {
        order: '',
        payment: '',
        status: 0
      };
      this.showForm = false;
    }
  },
  created() {
    this.fetchInvoices();
  }
};
</script>
