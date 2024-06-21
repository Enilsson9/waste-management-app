import Vue from 'vue';
import VueRouter from 'vue-router';
import WasteList from '../components/WasteList.vue';
import AddWaste from '../components/AddWaste.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: WasteList },
    { path: '/add', component: AddWaste },
];

const router = new VueRouter({
    routes,
});

export default router;
