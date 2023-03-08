import { createRouter, createWebHistory } from 'vue-router';

import AuthPage from '@/pages/AuthPage.vue';
import OnboardingPage from '@/pages/OnboardingPage.vue';
import ContactsPage from '@/pages/ContactsPage.vue';
import NotFound from '@/pages/NotFound.vue';

import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/contacts' },
        { path: '/auth', component: AuthPage, meta: { requiresUnauth: true } },
        { path: '/onboarding', component: OnboardingPage },
        { path: '/contacts', component: ContactsPage, meta: { requiresAuth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuth) next('/auth');
    else if (to.meta.requiresUnauth && store.getters.isAuth) next('/contacts');
    else next();
});

export default router;
