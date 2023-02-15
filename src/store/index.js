import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            searchQuery: ''
        };
    },
    getters: {
        searchQuery(state) {
            return state.searchQuery;
        }
    },
    mutations: {
        setSearchQuery(state, payload) {
            state.searchQuery = payload;
        }
    },
    actions: {
        setSearchQuery(context, payload) {
            context.commit('setSearchQuery', payload);
        }
    }
});

export default store;
