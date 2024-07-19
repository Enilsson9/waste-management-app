import { createRouter, createWebHistory } from 'vue-router'; // Import from vue-router for Vue 3


//Forms
import WasteForm from '../components/forms/WasteForm.vue';
import invoiceForm from '../components/forms/invoiceForm.vue';
import orderForm from '../components/forms/orderForm.vue';
import customerForm from '../components/forms/customerForm.vue';
import LoginForm from '../components/forms/LoginForm.vue';


const routes = [
    {
        path: '/',
        name: 'LoginForm',
        component: LoginForm
    },
    {
        path: '/waste',
        name: 'WasteList',
        component: WasteForm,
        meta: { requiresAuth: true, roles: ['admin'] }
    },
    //orders
    {
        path: '/orders',
        name: 'orderList',
        component: orderForm,
        meta: { requiresAuth: true, roles: ['admin', 'cashier', 'weigher'] }
    },
    //invoices
    {
        path: '/invoices',
        name: 'invoiceList',
        component: invoiceForm,
        meta: { requiresAuth: true, roles: ['admin', 'cashier'] }
        
    },
    //customers
    {
        path: '/customers',
        name: 'customerList',
        component: customerForm,
        meta: { requiresAuth: true, roles: ['admin'] }
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
      // Set a flag or state to handle access denial in components
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
