import { createRouter, createWebHistory } from 'vue-router';

import ContactsPage from '@/pages/ContactsPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/contacts' },
        { path: '/contacts', component: ContactsPage }
    ]
});

export default router;
