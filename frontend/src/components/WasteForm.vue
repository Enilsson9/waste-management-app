<template>
    <div>
        <h1>{{ isEdit ? 'Edit Waste' : 'Add Waste' }}</h1>
        <form @submit.prevent="saveWaste">
            <div>
                <label>Type:</label>
                <input v-model="waste.type" required />
            </div>
            <div>
                <label>Description:</label>
                <input v-model="waste.description" />
            </div>
            <div>
                <label>Price per Kg:</label>
                <input type="number" v-model="waste.pricePerKg" required />
            </div>
            <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
        </form>
    </div>
</template>

<script>
import wasteService from '../services/api';

export default {
    data() {
        return {
            waste: {
                type: '',
                description: '',
                pricePerKg: 0
            },
            isEdit: false
        };
    },
    created() {
        if (this.$route.params.id) {
            this.isEdit = true;
            this.fetchWaste(this.$route.params.id);
        }
    },
    methods: {
        fetchWaste(id) {
            wasteService.get(id)
                .then(response => {
                    this.waste = response.data;
                })
                .catch(error => {
                    console.error("There was an error fetching the waste!", error);
                });
        },
        saveWaste() {
            if (this.isEdit) {
                wasteService.update(this.waste._id, this.waste)
                    .then(() => {
                        this.$router.push({ name: 'WasteList' });
                    })
                    .catch(error => {
                        console.error("There was an error updating the waste!", error);
                    });
            } else {
                wasteService.create(this.waste)
                    .then(() => {
                        this.$router.push({ name: 'WasteList' });
                    })
                    .catch(error => {
                        console.error("There was an error creating the waste!", error);
                    });
            }
        }
    }
};
</script>
