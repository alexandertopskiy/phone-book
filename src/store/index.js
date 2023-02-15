import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            searchQuery: '',
            contacts: [
                {
                    name: 'Alex Hopper',
                    phone: '+7-123-456-78-90',
                    email: 'user1@mail.ru',
                    birthday: '01.01.2000'
                },
                {
                    name: 'Bob Dylan',
                    phone: '+7-123-456-78-90',
                    email: 'user2@mail.ru',
                    birthday: '01.01.2000'
                },
                {
                    name: 'Tyler Joseph',
                    phone: '+7-123-456-78-90',
                    email: 'user3@mail.ru',
                    birthday: '01.01.2000'
                },
                {
                    name: 'Alice',
                    phone: '+7-123-456-78-90',
                    birthday: '01.01.2000'
                }
            ]
        };
    },
    getters: {
        searchQuery(state) {
            return state.searchQuery;
        },
        contacts(state) {
            return state.contacts;
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
