import { createStore } from 'vuex';
import authModule from '@/store/modules/authModule';
import contactsModule from '@/store/modules/contacts';
import snackbarModule from '@/store/modules/snackbarModule.js';

const store = createStore({
    modules: {
        auth: authModule,
        contacts: contactsModule,
        snackbar: snackbarModule
    }
});

export default store;
