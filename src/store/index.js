import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            searchQuery: '',
            contacts: [
                {
                    id: 'ah',
                    name: 'Alex Hopper',
                    phone: '+7-123-456-78-90',
                    email: 'user1@mail.ru',
                    birthday: '01.01.2000'
                },
                {
                    id: 'bd',
                    name: 'Bob Dylan',
                    phone: '+7-123-456-78-90',
                    email: 'user2@mail.ru',
                    birthday: '01.01.2000'
                },
                {
                    id: 'tj',
                    name: 'Tyler Joseph',
                    phone: '+7-123-456-78-90',
                    email: 'user3@mail.ru',
                    birthday: '01.01.2000'
                },
                {
                    id: 'a',
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
        },
        registerContact(state, payload) {
            state.contacts.push(payload);
        },
        removeContact(state, index) {
            state.contacts.splice(index, 1);
        }
    },
    actions: {
        setSearchQuery(context, payload) {
            context.commit('setSearchQuery', payload);
        },
        registerContact(context, payload) {
            const newContact = {
                name: payload.name,
                phone: payload.phone,
                email: payload.email,
                birthday: payload.birthday,
                id: new Date().toISOString()
            };
            console.log(newContact);

            context.commit('registerContact', newContact);
        },
        removeContact(context, payload) {
            const contactId = payload.id;
            const contactIndex = context.getters.contacts.findIndex(contact => contact.id === contactId);

            context.commit('removeContact', contactIndex);
        }
    }
});

export default store;
