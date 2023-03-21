import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const authModule = {
    state() {
        return {
            userMail: null,
            userId: null,
            token: null,
            didAutoLogout: false
        };
    },
    getters,
    mutations,
    actions
};

export default authModule;
