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

// Route guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
        next('/'); // Redirect to login if not authenticated
      } else {
        next(); // Allow navigation if authenticated
      }
    } else {
      next(); // Always allow navigation if route does not require authentication
    }
  });

export default router;
