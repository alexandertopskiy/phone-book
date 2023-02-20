import { createStore } from 'vuex';
import snackbarModule from './snackbarModule.js';

const store = createStore({
    modules: {
        snackbar: snackbarModule
    },
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
                    email: null,
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
        },
        updateContact(state, payload) {
            state.contacts[payload.index] = payload.data;
        }
    },
    actions: {
        setSearchQuery(context, payload) {
            context.commit('setSearchQuery', payload);
        },
        async registerContact(context, payload) {
            const newContact = {
                name: payload.name,
                phone: payload.phone,
                email: payload.email,
                birthday: payload.birthday,
                id: new Date().toISOString()
            };
            console.log(newContact);

            context.commit('registerContact', newContact);

            return {
                message: 'Контакт добавлен',
                type: 'success'
            };
        },
        async removeContact(context, payload) {
            const contactId = payload.id;
            const contactIndex = await context.getters.contacts.findIndex(contact => contact.id === contactId);

            context.commit('removeContact', contactIndex);

            return {
                message: 'Контакт удален',
                type: 'success'
            };
        },
        async updateContact(context, payload) {
            const contactId = payload.id;
            const contactIndex = context.getters.contacts.findIndex(contact => contact.id === contactId);

            context.commit('updateContact', {
                index: contactIndex,
                data: payload
            });

            return {
                message: 'Контакт обновлен',
                type: 'success'
            };
        },
        async importContacts(context, payload) {
            const currentContacts = context.rootGetters.contacts;
            // юзер может ввести как массив, так и один объект
            const contactForImport = payload.length ? payload : [payload];
            // счетчик добавленных контактов
            let importedContacts = 0;
            // счетчик недобавленных контактов
            let issues = 0;

            console.log(currentContacts);
            console.log(contactForImport, contactForImport.length);

            contactForImport.forEach(importedContact => {
                // уже существующие контакты () не добавляются
                const alreadyExists = currentContacts.some(
                    existedContact =>
                        existedContact.phone === importedContact.phone || existedContact.email === importedContact.email
                );
                // если у контакта не указано имя/номер, то не добавлять его
                const isCorrect = !!(importedContact.name && importedContact.phone);

                if (!alreadyExists && isCorrect) {
                    // форматирование контакта: добавляются только поля с корректными данными, иначе - обнуляются
                    importedContacts++;
                    const correctedContact = {
                        name: importedContact.name,
                        phone: importedContact.phone,
                        email: importedContact.email || '',
                        birthday: importedContact.birthday || null
                    };
                    // TODO: временный костыль для генерации уникальных айдишников
                    setTimeout(() => {
                        context.dispatch('registerContact', correctedContact);
                    }, 300);
                } else issues++;
            });

            // результат импорта (были ли добавлены контакты/кол-во/причина НЕ добавления)
            let resultMessage = '';
            const causeText = 'Возможно, введенные контакты уже существуют или они записаны некорректно';

            if (importedContacts === 0) resultMessage = `Ни один из контактов не был импортирован. ${causeText}`;
            else if (issues !== 0)
                resultMessage = `Импорт завершен, но часть контактов (${issues} шт) не была импортирована. ${causeText}`;
            else resultMessage = `Импорт завершен. Все контакты (${importedContacts} шт) были импортированы.`;

            return {
                message: resultMessage,
                type: importedContacts === 0 || issues !== 0 ? 'failure' : 'success'
            };
        }
    }
});

export default store;
