<template>
    <div>
        <h1>Order Types</h1>
        <ul>
            <li v-for="order in orders" :key="order._id">
                {{ order.typeOfWaste }} - {{ order.weight }} - {{ order.createdAt }}
                <button @click="editOrder(order)">Edit</button>
                <button @click="deleteOrder(order._id)">Delete</button>
            </li>
        </ul>
    </div>
    <router-link to="/order/add">Add new Order</router-link>
</template>

<script>
import orderService from '../../services/api';

export default {
    data() {
        return {
            orders: []
        };
    },
    created() {
        this.fetchOrders();
    },
    methods: {
        fetchOrders() {
            orderService.getAllOrders()
                .then(response => {
                    this.orders = response.data;
                })
                .catch(error => {
                    console.error("There was an error fetching the orders!", error);
                });
        },
        deleteOrder(id) {
            orderService.delete(id)
                .then(() => {
                    this.fetchOrders();
                })
                .catch(error => {
                    console.error("There was an error deleting the order!", error);
                });
        },
        editOrder(order) {
            this.$router.push({ name: 'EditOrder', params: { id: order._id } });
        }
    }
};
</script>
