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
    /*getOrder(id) {
        return apiClient.get(`/orders/${id}`);
    },
    createOrder(data) {
        return apiClient.post('/orders', data);
    },
    updateOrder(id, data) {
        return apiClient.put(`/orders/${id}`, data);
    },
    deleteOrder(id) {
        return apiClient.delete(`/orders/${id}`);
    },*/

    // Customers endpoints
    getAllCustomers() {
        return apiClient.get('/customers');
    },
    /*getCustomer(id) {
        return apiClient.get(`/customers/${id}`);
    },
    createCustomer(data) {
        return apiClient.post('/customers', data);
    },
    updateCustomer(id, data) {
        return apiClient.put(`/customers/${id}`, data);
    },
    deleteCustomer(id) {
        return apiClient.delete(`/customers/${id}`);
    },*/
    // Invoices endpoints
    getAllInvoices() {
        return apiClient.get('/invoices');
    },
    /*getInvoice(id) {
        return apiClient.get(`/invoices/${id}`);
    },
    createInvoice(data) {
        return apiClient.post('/invoices', data);
    },
    updateInvoice(id, data) {
        return apiClient.put(`/invoices/${id}`, data);
    },
    deleteInvoice(id) {
        return apiClient.delete(`/invoices/${id}`);
    }*/
};
