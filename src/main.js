import { createApp } from 'vue';
import App from '@/App.vue';
import components from '@/components/ui';

import vuetify from '@/plugins/vuetify';
import { loadFonts } from '@/plugins/webfontloader';
import store from '@/store';
import router from '@/router';

loadFonts();

const app = createApp(App);

// регистрация глобальных ui-компонентов
components.forEach(component => app.component(component.name, component));

app.use(vuetify);
app.use(store);
app.use(router);

app.mount('#app');
