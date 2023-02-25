import { createStore } from 'vuex';
import authModule from '@/store/modules/auth';
import contactsModule from '@/store/modules/contacts';
import snackbarModule from '@/store/modules/snackbar';

const store = createStore({
    modules: {
        auth: authModule,
        contacts: contactsModule,
        snackbar: snackbarModule
    }
});

export default store;
