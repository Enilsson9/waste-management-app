import { createRouter, createWebHistory } from 'vue-router'; // Import from vue-router for Vue 3
import WasteList from '../components/WasteList.vue';
import WasteForm from '../components/WasteForm.vue';
import invoiceForm from '../components/invoiceForm.vue';
import orderForm from '../components/orderForm.vue';
import customerForm from '../components/customerForm.vue';

const routes = [
    {
        path: '/',
        name: 'WasteList',
        component: WasteList
    },
    {
        path: '/waste/add',
        name: 'AddWaste',
        component: WasteForm
    },
    {
        path: '/waste/edit/:id',
        name: 'EditWaste',
        component: WasteForm,
        props: true
    },
    {
        path: '/orders',
        name: 'manageOrders',
        component: orderForm
    },
    {
        path: '/invoices',
        name: 'manageInvoices',
        component: invoiceForm
    },
    {
        path: '/customer',
        name: 'manageCustomers',
        component: customerForm
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
