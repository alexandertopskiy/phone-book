import { createRouter, createWebHistory } from 'vue-router';

import ContactsPage from '@/pages/ContactsPage.vue';
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/contacts' },
        { path: '/contacts', component: ContactsPage },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

export default router;
