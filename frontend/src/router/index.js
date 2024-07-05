import { createRouter, createWebHistory } from 'vue-router'; // Import from vue-router for Vue 3

//Lists
import WasteList from '../components/lists/WasteList.vue';
import orderList from '../components/lists/orderList.vue';
import customerList from '../components/lists/customerList.vue';
import invoiceList from '../components/lists/invoiceList.vue';
//Forms
import WasteForm from '../components/forms/WasteForm.vue';
import invoiceForm from '../components/forms/invoiceForm.vue';
import orderForm from '../components/forms/orderForm.vue';
import customerForm from '../components/forms/customerForm.vue';

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
    //orders
    {
        path: '/orders',
        name: 'orderList',
        component: orderList
    },
    {
        path: '/order/add',
        name: 'AddOrder',
        component: orderForm
    },
    {
        path: '/order/edit/:id',
        name: 'EditOrder',
        component: orderForm,
        props: true
    },
    //invoices
    {
        path: '/invoices',
        name: 'invoiceList',
        component: invoiceList
    },
    {
        path: '/invoice/add',
        name: 'AddInvoice',
        component: invoiceForm
    },
    {
        path: '/invoice/edit/:id',
        name: 'editInvoice',
        component: invoiceForm,
        props: true
    },
    //customers
    {
        path: '/customers',
        name: 'customerList',
        component: customerList
    },
    {
        path: '/customer/add',
        name: 'AddCustomer',
        component: customerForm
    },
    {
        path: '/customer/edit/:id',
        name: 'EditCustomer',
        component: customerForm,
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
