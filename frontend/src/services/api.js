import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    // Waste endpoints
    getAllWaste() {
        return apiClient.get('/waste');
    },
    getWaste(id) {
        return apiClient.get(`/waste/${id}`);
    },
    createWaste(data) {
        return apiClient.post('/waste', data);
    },
    updateWaste(id, data) {
        return apiClient.put(`/waste/${id}`, data);
    },
    deleteWaste(id) {
        return apiClient.delete(`/waste/${id}`);
    },

   // Orders endpoints
    getAllOrders() {
        return apiClient.get('/orders');
    },
    getOrder(id) {
        return apiClient.get(`/order/${id}`);
    },
    createOrder(data) {
        return apiClient.post('/order', data);
    },
    updateOrder(id, data) {
        return apiClient.put(`/order/${id}`, data);
    },
    deleteOrder(id) {
        return apiClient.delete(`/order/${id}`);
    },

    // Customers endpoints
    getAllCustomers() {
        return apiClient.get('/customers');
    },
    getCustomer(id) {
        return apiClient.get(`/customer/${id}`);
    },
    createCustomer(data) {
        return apiClient.post('/customer', data);
    },
    updateCustomer(id, data) {
        return apiClient.put(`/customer/${id}`, data);
    },
    deleteCustomer(id) {
        return apiClient.delete(`/customer/${id}`);
    },
    // Invoices endpoints
    getAllInvoices() {
        return apiClient.get('/invoices');
    },
    getInvoice(id) {
        return apiClient.get(`/invoice/${id}`);
    },
    createInvoice(data) {
        return apiClient.post('/invoice', data);
    },
    updateInvoice(id, data) {
        return apiClient.put(`/invoice/${id}`, data);
    },
    deleteInvoice(id) {
        return apiClient.delete(`/invoice/${id}`);
    }
};
