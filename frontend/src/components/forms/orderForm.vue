<template>
  <div class="container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id" class="data-item">
          <td @click="viewOrderDetails(order._id)" class="clickable">{{ order.orderId }}</td>
          <td>{{ order.customer ? order.customer.name : 'N/A' }}</td>
          <td>
            <ul>
              <li v-for="item in order.items" :key="item.material ? item.material._id : item._id">
                {{ item.material ? item.material.name : 'N/A' }}: {{ item.weight }} lbs
              </li>
            </ul>
          </td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.status }}</td>
          <td>{{ new Date(order.timestamp).toLocaleString() }}</td>
          <td class="action-buttons">
            <button class="btn edit-btn" @click="editOrder(order)">Edit</button>
            <button class="btn delete-btn" @click="confirmDeleteOrder(order)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button v-if="!showForm" class="btn add-btn" @click="toggleForm(true)">Add New Order</button>

    <form v-if="showForm" @submit.prevent="submitForm" class="data-form">
      <select v-model="newOrder.customer" required class="input-field">
        <option value="" disabled>Select Customer</option>
        <option v-for="customer in customers" :key="customer._id" :value="customer._id">{{ customer.name }}</option>
      </select>
      <div v-for="(item, index) in newOrder.items" :key="index" class="item-field">
        <select v-model="item.material" required class="input-field">
          <option value="" disabled>Select Material</option>
          <option v-for="waste in wasteTypes" :key="waste._id" :value="waste._id">{{ waste.name }}</option>
        </select>
        <input v-model.number="item.weight" type="number" step="0.01" placeholder="Weight" required class="input-field">
        <button type="button" @click="removeItem(index)" class="btn delete-btn">Remove</button>
      </div>
      <div class="item-field">
        <button type="button" @click="addItem" class="btn edit-btn">Add Item</button>
      </div>
      
      <select v-model="newOrder.status" required class="input-field">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>
      <div class="form-buttons">
        <button type="submit" class="btn submit-btn">{{ isEditing ? 'Update' : 'Add' }} Order</button>
        <button type="button" @click="cancelEdit" class="btn cancel-btn">Cancel</button>
      </div>
    </form>

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
      customers: [],
      wasteTypes: [],
      newOrder: {
        customer: '',
        items: [{ material: '', weight: '' }],
        status: 'pending'
      },
      showForm: false,
      showDeleteModal: false,
      deleteOrderId: null,
      isEditing: false,
      editOrderId: null
    };
  },
  created() {
    this.fetchOrders();
    this.fetchCustomers();
    this.fetchWasteTypes();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await api.getAllOrders();
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    async fetchCustomers() {
      try {
        const response = await api.getAllCustomers();
        this.customers = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },
    async fetchWasteTypes() {
      try {
        const response = await api.getAllWaste();
        this.wasteTypes = response.data;
      } catch (error) {
        console.error('Error fetching waste types:', error);
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
        await this.updateOrder();
      } else {
        await this.createOrder();
      }
    },
    async createOrder() {
      try {
        const response = await api.addOrder(this.newOrder);
        this.orders.push(response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error creating order:', error);
      }
    },
    async updateOrder() {
      try {
        const response = await api.updateOrder(this.editOrderId, this.newOrder);
        const index = this.orders.findIndex(order => order._id === this.editOrderId);
        if (index !== -1) {
          this.orders.splice(index, 1, response.data);
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
        console.error('Error deleting order:', error);
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
      this.newOrder = {
        customer: order.customer._id,
        items: order.items.map(item => ({ material: item.material._id, weight: item.weight })),
        status: order.status
      };
      this.editOrderId = order._id;
      this.isEditing = true;
      this.showForm = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.newOrder = {
        customer: '',
        items: [{ material: '', weight: '' }],
        status: 'pending'
      };
      this.isEditing = false;
      this.editOrderId = null;
      this.showForm = false;
    },
    addItem() {
      this.newOrder.items.push({ material: '', weight: '' });
    },
    removeItem(index) {
      this.newOrder.items.splice(index, 1);
    },
    viewOrderDetails(orderId) {
      this.$router.push({ name: 'OrderDetails', params: { orderId } });
    }
  }
};
</script>

<style>
/* Add styling for .clickable if needed */
.clickable {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
