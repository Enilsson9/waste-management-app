import { createRouter, createWebHistory } from 'vue-router'; // Import from vue-router for Vue 3
import WasteList from '../components/WasteList.vue';
import WasteForm from '../components/WasteForm.vue';

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
