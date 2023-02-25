import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const contactsModule = {
    namespaced: true,
    state() {
        return {
            searchQuery: '',
            contacts: []
        };
    },
    getters,
    mutations,
    actions
};

export default contactsModule;
