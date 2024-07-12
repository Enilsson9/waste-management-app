<template>
  <div class="container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer._id" class="data-item">
          <td>{{ customer.name }}</td>
          <td>{{ customer.description }}</td>
          <td>{{ customer.category }}</td>
          <td class="action-buttons">
            <button class="btn edit-btn" @click="editCustomer(customer)">Edit</button>
            <button class="btn delete-btn" @click="confirmDeleteCustomer(customer)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Toggle Add New Customer Button -->
    <button v-if="!showForm" class="btn add-btn" @click="toggleForm(true)">Add New Customer</button>

    <!-- Customer Form -->
    <form v-if="showForm" @submit.prevent="submitForm" class="data-form">
      <input v-model="newCustomer.name" placeholder="Name" required class="input-field">
      <input v-model="newCustomer.description" placeholder="Description" required class="input-field">
      <select v-model="newCustomer.category" class="input-field">
        <option v-for="customerType in customerTypes" :key="customerType.id" :value="customerType.name">
          {{ customerType.name }}
        </option>
      </select>
      <div class="form-buttons">
        <button type="submit" class="btn submit-btn">{{ isEditing ? 'Update' : 'Add' }} Customer</button>
        <button type="button" @click="cancelEdit" v-if="isEditing" class="btn cancel-btn">Cancel</button>
      </div>
    </form>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <p>Are you sure you want to delete this customer?</p>
        <div class="modal-buttons">
          <button class="btn confirm-delete-btn" @click="deleteCustomer">Yes, Delete</button>
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
        { id: 4, name: 'Internal' }
      ],
      showForm: false,
      showDeleteModal: false,
      deleteCustomerId: null,
      isEditing: false,
      editCustomerId: null
    };
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await api.getAllCustomers();
        this.customers = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
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
        await this.updateCustomer();
      } else {
        await this.createCustomer();
      }
    },
    async createCustomer() {
      try {
        const response = await api.createCustomer(this.newCustomer);
        this.customers.push(response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    },
    async updateCustomer() {
      try {
        await api.updateCustomer(this.editCustomerId, this.newCustomer);
        const index = this.customers.findIndex(customer => customer._id === this.editCustomerId);
        if (index !== -1) {
          this.customers.splice(index, 1, { ...this.newCustomer, _id: this.editCustomerId });
        }
        this.resetForm();
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    },
    async deleteCustomer() {
      try {
        await api.deleteCustomer(this.deleteCustomerId);
        this.customers = this.customers.filter(customer => customer._id !== this.deleteCustomerId);
        this.closeDeleteModal();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    },
    confirmDeleteCustomer(customer) {
      this.showDeleteModal = true;
      this.deleteCustomerId = customer._id;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.deleteCustomerId = null;
    },
    editCustomer(customer) {
      this.newCustomer = { ...customer };
      this.editCustomerId = customer._id;
      this.isEditing = true;
      this.showForm = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.isEditing = false;
      this.newCustomer = {
        name: '',
        description: '',
        category: ''
      };
      this.showForm = false;
    }
  },
  created() {
    this.fetchCustomers();
  }
};
</script>