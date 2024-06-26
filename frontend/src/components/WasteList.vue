<template>
    <div>
        <h1>Waste Types</h1>
        <ul>
            <li v-for="waste in wastes" :key="waste._id">
                {{ waste.type }} - {{ waste.description }} - {{ waste.pricePerKg }}
                <button @click="editWaste(waste)">Edit</button>
                <button @click="deleteWaste(waste._id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import wasteService from '../services/api';

export default {
    data() {
        return {
            wastes: []
        };
    },
    created() {
        this.fetchWastes();
    },
    methods: {
        fetchWastes() {
            wasteService.getAll()
                .then(response => {
                    this.wastes = response.data;
                })
                .catch(error => {
                    console.error("There was an error fetching the wastes!", error);
                });
        },
        deleteWaste(id) {
            wasteService.delete(id)
                .then(() => {
                    this.fetchWastes();
                })
                .catch(error => {
                    console.error("There was an error deleting the waste!", error);
                });
        },
        editWaste(waste) {
            this.$router.push({ name: 'EditWaste', params: { id: waste._id } });
        }
    }
};
</script>
