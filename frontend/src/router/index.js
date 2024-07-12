import { createRouter, createWebHistory } from 'vue-router'; // Import from vue-router for Vue 3


//Forms
import WasteForm from '../components/forms/WasteForm.vue';
import invoiceForm from '../components/forms/invoiceForm.vue';
import orderForm from '../components/forms/orderForm.vue';
import customerForm from '../components/forms/customerForm.vue';


const routes = [
    {
        path: '/',
        name: 'WasteList',
        component: WasteForm
    },
    //orders
    {
        path: '/orders',
        name: 'orderList',
        component: orderForm
    },
    //invoices
    {
        path: '/invoices',
        name: 'invoiceList',
        component: invoiceForm
    },
    //customers
    {
        path: '/customers',
        name: 'customerList',
        component: customerForm
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
