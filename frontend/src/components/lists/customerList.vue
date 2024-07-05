<template>
    <div>
        <h1>Customer Types</h1>
        <ul>
            <li v-for="customer in customers" :key="customer._id">
                {{ customer.name }} - {{ customer.description }}
                <button @click="editCustomer(customer)">Edit</button>
                <button @click="deleteCustomer(customer._id)">Delete</button>
            </li>
        </ul>
    </div>
    <router-link to="/customer/add">Add new Customer</router-link>
</template>

<script>
import wasteService from '../../services/api';

export default {
    data() {
        return {
            customers: []
        };
    },
    created() {
        this.fetchCustomers();
    },
    methods: {
        fetchCustomers() {
            wasteService.getAllCustomers()
                .then(response => {
                    this.customers = response.data;
                })
                .catch(error => {
                    console.error("There was an error fetching the customers!", error);
                });
        },
        deleteCustomers(id) {
            wasteService.deleteCustomer(id)
                .then(() => {
                    this.fetchCustomers();
                })
                .catch(error => {
                    console.error("There was an error deleting the waste!", error);
                });
        },
        editCustomer(customer) {
            this.$router.push({ name: 'EditCustomer', params: { id: customer._id } });
        }
    }
};
</script>
