import { createRouter, createWebHistory } from 'vue-router';

// Import the components
import WasteForm from '../components/forms/WasteForm.vue';
import invoiceForm from '../components/forms/invoiceForm.vue';
import orderForm from '../components/forms/orderForm.vue';
import customerForm from '../components/forms/customerForm.vue';
import LoginForm from '../components/forms/LoginForm.vue';
import OrderDetails from '../components/forms/OrderDetails.vue'; 
import CustomerDetails from '../components/forms/CustomerDetails.vue'; 
import InvoiceDetails from '../components/forms/InvoiceDetails.vue'; 
import HomeForm from '../components/forms/HomeForm.vue'; 

const routes = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/home',
    name: 'HomeForm',
    component: HomeForm,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/waste',
    name: 'WasteList',
    component: WasteForm,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/orders',
    name: 'orderList',
    component: orderForm,
    meta: { requiresAuth: true, roles: ['admin', 'cashier', 'weigher'] }
  },
  {
    path: '/orders/:orderId',
    name: 'OrderDetails',
    component: OrderDetails,
    meta: { requiresAuth: true, roles: ['admin', 'cashier', 'weigher'] }
  },
  {
    path: '/invoices',
    name: 'invoiceList',
    component: invoiceForm,
    meta: { requiresAuth: true, roles: ['admin', 'cashier'] }
  },
  {
    path: '/customers',
    name: 'customerList',
    component: customerForm,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/customers/:customerId',
    name: 'CustomerDetails',
    component: CustomerDetails,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/invoices/:invoiceId',
    name: 'InvoiceDetails',
    component: InvoiceDetails,
    meta: { requiresAuth: true, roles: ['admin', 'cashier'] }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');
  
  if (to.meta.requiresAuth) {
    if (!token) {
      next('/');
    } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      window.alert('You do not have access to this page.');
      next(false); 
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
