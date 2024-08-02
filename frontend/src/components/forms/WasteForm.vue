<template>
  <div class="container">
    <div v-if="accessDenied" class="warning">
      <p>You do not have access to this page.</p>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th @click="sortBy('name')">
            Name
            <span class="sort-arrow" v-if="sortKey === 'name'">
              {{ sortDirection === 1 ? '▲' : '▼' }}
            </span>
          </th>
          <th @click="sortBy('pricePublic')">
            Price (Public)
            <span class="sort-arrow" v-if="sortKey === 'pricePublic'">
              {{ sortDirection === 1 ? '▲' : '▼' }}
            </span>
          </th>
          <th @click="sortBy('priceInternal')">
            Price (Internal)
            <span class="sort-arrow" v-if="sortKey === 'priceInternal'">
              {{ sortDirection === 1 ? '▲' : '▼' }}
            </span>
          </th>
          <th @click="sortBy('priceWholesale')">
            Price (Wholesale)
            <span class="sort-arrow" v-if="sortKey === 'priceWholesale'">
              {{ sortDirection === 1 ? '▲' : '▼' }}
            </span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="waste in sortedWastes" :key="waste._id" class="data-item">
          <td>{{ waste.name }}</td>
          <td>{{ waste.pricePublic }}</td>
          <td>{{ waste.priceInternal }}</td>
          <td>{{ waste.priceWholesale }}</td>
          <td class="action-buttons">
            <button class="btn edit-btn" @click="editWaste(waste)">Edit</button>
            <button class="btn delete-btn" @click="confirmDeleteWaste(waste)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="toggleAddWasteForm" class="btn add-btn">
      {{ showAddWasteForm ? "Cancel" : "Add Waste" }}
    </button>

    <form v-if="showAddWasteForm" @submit.prevent="submitForm" class="data-form">
      <input v-model="newWaste.name" placeholder="Name" required class="input-field">
      <input v-model.number="newWaste.pricePublic" type="number" step="0.01" placeholder="Price (Public)" required class="input-field">
      <input v-model.number="newWaste.priceInternal" type="number" step="0.01" placeholder="Price (Internal)" required class="input-field">
      <input v-model.number="newWaste.priceWholesale" type="number" step="0.01" placeholder="Price (Wholesale)" required class="input-field">
      <div class="form-buttons">
        <button type="submit" class="btn submit-btn">{{ isEditing ? 'Update' : 'Add' }} Waste</button>
        <button type="button" @click="cancelEdit" v-if="isEditing" class="btn cancel-btn">Cancel</button>
      </div>
    </form>

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
        pricePublic: '',
        priceInternal: '',
        priceWholesale: ''
      },
      showAddWasteForm: false,
      showDeleteModal: false,
      deleteWasteId: null,
      isEditing: false,
      editWasteId: null,
      sortKey: '',
      sortDirection: 1 // 1 for ascending, -1 for descending
    };
  },
  created() {
    this.fetchWastes();
  },
  computed: {
    sortedWastes() {
      // Clone the array before sorting to avoid mutating the original array
      return [...this.wastes].sort((a, b) => {
        let result = 0;
        if (this.sortKey) {
          if (typeof a[this.sortKey] === 'string') {
            result = a[this.sortKey].localeCompare(b[this.sortKey]);
          } else if (typeof a[this.sortKey] === 'number') {
            result = a[this.sortKey] - b[this.sortKey];
          }
        }
        return result * this.sortDirection;
      });
    }
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
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortDirection *= -1;
      } else {
        this.sortKey = key;
        this.sortDirection = 1;
      }
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
        pricePublic: '',
        priceInternal: '',
        priceWholesale: ''
      };
      this.isEditing = false;
      this.editWasteId = null;
      this.showAddWasteForm = false;
    }
  }
};
</script>

<style scoped>


.sort-arrow {
  margin-left: 8px;
  font-size: 12px;
}


</style>