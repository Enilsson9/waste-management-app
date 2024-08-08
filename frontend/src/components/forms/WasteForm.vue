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

    <input type="file" @change="handleFileUpload" ref="fileInput" class="file-input">
    <button @click="importPrices" class="btn import-btn">Import Prices</button>


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
import * as XLSX from 'xlsx';

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
      sortDirection: 1, // 1 for ascending, -1 for descending
      file: null,
      importedData: []
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
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file;
      }
    },
    async importPrices() {
      if (this.file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          this.processImportedData(jsonData);
        };
        reader.readAsArrayBuffer(this.file);
      }
    },
    processImportedData(data) {
      const headers = data[0];
      const rows = data.slice(1);
      const importedData = rows.map(row => {
        const waste = {};
        headers.forEach((header, index) => {
          waste[header] = row[index];
        });
        return waste;
      });
      this.updateWastes(importedData);
    },
    async updateWastes(importedData) {
      try {
        for (const waste of importedData) {
          await api.updateWasteByName(waste.name, waste);
        }
        this.fetchWastes();
      } catch (error) {
        console.error('Error updating wastes:', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.warning {
  color: red;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.data-table th {
  background-color: #f2f2f2;
  cursor: pointer;
}

.data-item:nth-child(even) {
  background-color: #f9f9f9;
}

.data-item:hover {
  background-color: #f1f1f1;
}

.sort-arrow {
  margin-left: 8px;
  font-size: 12px;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.btn {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.add-btn {
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.file-input {
  margin-top: 20px;
}

.import-btn {
  margin-top: 10px;
  background-color: #2196F3;
  color: white;
}

.data-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.input-field {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  gap: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.confirm-delete-btn {
  background-color: #f44336;
  color: white;
}
</style>
