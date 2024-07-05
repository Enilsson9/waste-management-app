<template>
    <div>
        <h1>Invoice Types</h1>
        <ul>
            <li v-for="invoice in invoices" :key="invoice._id">
                {{ invoice.order }} - {{ invoice.payment }} - {{ invoice.status }} - {{ invoice.createdAt }}
                <button @click="editInvoice(invoice)">Edit</button>
                <button @click="deleteInvoice(invoice._id)">Delete</button>
            </li>
        </ul>
    </div>
    <router-link to="/invoice/add">Add new Invoice</router-link>
</template>

<script>
import invoiceService from '../../services/api';

export default {
    data() {
        return {
            invoices: []
        };
    },
    created() {
        this.fetchInvoices();
    },
    methods: {
        fetchInvoices() {
            invoiceService.getAllInvoices()
                .then(response => {
                    this.invoices = response.data;
                })
                .catch(error => {
                    console.error("There was an error fetching the invoices!", error);
                });
        },
        deleteInvoice(id) {
            invoiceService.delete(id)
                .then(() => {
                    this.fetchInvoices();
                })
                .catch(error => {
                    console.error("There was an error deleting the invoice!", error);
                });
        },
        editInvoice(invoice) {
            this.$router.push({ name: 'editInvoice', params: { id: invoice._id } });
        }
    }
};
</script>
