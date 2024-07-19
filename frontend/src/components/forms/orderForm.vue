<template>
  <div class="container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Type of Waste</th>
          <th>Weight</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id" class="data-item">
          <td>{{ order.typeOfWaste }}</td>
          <td>{{ order.weight }}</td>
          <td>{{ order.createdAt }}</td>
          <td class="action-buttons">
            <template v-if="!isEditing || order._id !== editOrderId">
              <button class="btn edit-btn" @click="editOrder(order)">Edit</button>
            </template>
            <button class="btn delete-btn" @click="confirmDeleteOrder(order)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Toggle Add New Order Button -->
    <button v-if="!showForm" class="btn add-btn" @click="toggleForm(true)">Add New Order</button>

    <!-- Order Form -->
    <form v-if="showForm" @submit.prevent="submitForm" class="data-form">
      <select v-model="newOrder.typeOfWaste" required class="input-field">
        <option v-for="waste in wasteTypes" :key="waste.id" :value="waste.name">{{ waste.name }}</option>
      </select>
      <input v-model.number="newOrder.weight" type="number" placeholder="Weight" required class="input-field">
      <div class="form-buttons">
        <button type="submit" class="btn submit-btn">{{ isEditing ? 'Update' : 'Add' }} Order</button>
        <button type="button" @click="cancelEdit" class="btn cancel-btn">Cancel</button>
      </div>
    </form>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <p>Are you sure you want to delete this order?</p>
        <div class="modal-buttons">
          <button class="btn confirm-delete-btn" @click="deleteOrder">Yes, Delete</button>
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
      orders: [],
      newOrder: {
        typeOfWaste: '',
        weight: ''
      },
      wasteTypes: [
        { id: 1, name: 'Plastic' },
        { id: 2, name: 'Metal' },
        { id: 3, name: 'Cardboard' },
        { id: 4, name: 'Bronze' },
      ],
      showForm: false,
      showDeleteModal: false,
      deleteOrderId: null,
      isEditing: false,
      editOrderId: null
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      api.getAllOrders()
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.error("Error fetching orders:", error);
        });
    },
    toggleForm(show) {
      this.showForm = show;
      if (!show) {
        this.resetForm();
      }
    },
    async submitForm() {
      if (this.isEditing) {
        await this.updateOrder();
      } else {
        await this.addOrder();
      }
    },
    async addOrder() {
      try {
        const response = await api.addOrder(this.newOrder);
        this.orders.push(response.data);
        this.resetForm();
      } catch (error) {
        console.error("Error adding order:", error);
      }
    },
    async updateOrder() {
      try {
        await api.updateOrder(this.editOrderId, this.newOrder);
        const index = this.orders.findIndex(order => order._id === this.editOrderId);
        if (index !== -1) {
          this.orders.splice(index, 1, { ...this.newOrder, _id: this.editOrderId });
        }
        this.resetForm();
      } catch (error) {
        console.error('Error updating order:', error);
      }
    },
    async deleteOrder() {
      try {
        await api.deleteOrder(this.deleteOrderId);
        this.orders = this.orders.filter(order => order._id !== this.deleteOrderId);
        this.closeDeleteModal();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    },
    confirmDeleteOrder(order) {
      this.showDeleteModal = true;
      this.deleteOrderId = order._id;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.deleteOrderId = null;
    },
    editOrder(order) {
      this.newOrder = { ...order };
      this.editOrderId = order._id;
      this.isEditing = true;
      this.showForm = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.newOrder = {
        typeOfWaste: '',
        weight: ''
      };
      this.isEditing = false;
      this.editOrderId = null;
      this.showForm = false;
    }
  }
};
</script>
