<template>
  <div class="container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="waste in wastes" :key="waste._id" class="data-item">
          <td>{{ waste.name }}</td>
          <td>{{ waste.description }}</td>
          <td>{{ waste.quantity }}</td>
          <td class="action-buttons">
            <button class="btn edit-btn" @click="editWaste(waste)">Edit</button>
            <button class="btn delete-btn" @click="confirmDeleteWaste(waste)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Toggle Add New Waste Form -->
    <button @click="toggleAddWasteForm" class="btn add-btn">
      {{ showAddWasteForm ? "Cancel" : "Add Waste" }}
    </button>

    <!-- Waste Form -->
    <form v-if="showAddWasteForm" @submit.prevent="submitForm" class="data-form">
      <input v-model="newWaste.name" placeholder="Name" required  class="input-field">
      <input v-model="newWaste.description" placeholder="Description" required  class="input-field">
      <input v-model.number="newWaste.quantity" type="number" placeholder="Quantity" required  class="input-field">
      <div class="form-buttons">
        <button type="submit" class="btn submit-btn">{{ isEditing ? 'Update' : 'Add' }} Waste</button>
        <button type="button" @click="cancelEdit" v-if="isEditing" class="btn cancel-btn">Cancel</button>
      </div>
    </form>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <p>Are you sure you want to delete this waste?</p>
        <div class="modal-buttons">
          <button class="btn confirm-delete-btn" @click="deleteWaste">Yes, Delete</button>
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
      wastes: [],
      newWaste: {
        name: '',
        description: '',
        quantity: 0
      },
      showAddWasteForm: false,
      showDeleteModal: false,
      deleteWasteId: null,
      isEditing: false,
      editWasteId: null
    };
  },
  created() {
    this.fetchWastes();
  },
  methods: {
    fetchWastes() {
      api.getAllWaste()
        .then(response => {
          this.wastes = response.data;
        })
        .catch(error => {
          console.error('Error fetching wastes:', error);
        });
    },
    toggleAddWasteForm() {
      this.showAddWasteForm = !this.showAddWasteForm;
      if (!this.showAddWasteForm) {
        this.resetForm();
      }
    },
    async submitForm() {
      if (this.isEditing) {
        await this.updateWaste();
      } else {
        await this.createWaste();
      }
    },
    async createWaste() {
      try {
        const response = await api.createWaste(this.newWaste);
        this.wastes.push(response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error creating waste:', error);
      }
    },
    async updateWaste() {
      try {
        await api.updateWaste(this.editWasteId, this.newWaste);
        const index = this.wastes.findIndex(waste => waste._id === this.editWasteId);
        if (index !== -1) {
          this.wastes.splice(index, 1, { ...this.newWaste, _id: this.editWasteId });
        }
        this.resetForm();
      } catch (error) {
        console.error('Error updating waste:', error);
      }
    },
    confirmDeleteWaste(waste) {
      this.showDeleteModal = true;
      this.deleteWasteId = waste._id;
    },
    async deleteWaste() {
      try {
        await api.deleteWaste(this.deleteWasteId);
        this.wastes = this.wastes.filter(waste => waste._id !== this.deleteWasteId);
        this.closeDeleteModal();
      } catch (error) {
        console.error('Error deleting waste:', error);
      }
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.deleteWasteId = null;
    },
    editWaste(waste) {
      this.newWaste = { ...waste };
      this.editWasteId = waste._id;
      this.isEditing = true;
      this.showAddWasteForm = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.newWaste = {
        name: '',
        description: '',
        quantity: 0
      };
      this.isEditing = false;
      this.editWasteId = null;
      this.showAddWasteForm = false;
    }
  }
};
</script>
