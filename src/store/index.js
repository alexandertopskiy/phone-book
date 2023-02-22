import { createStore } from 'vuex';
import snackbarModule from './snackbarModule.js';

const store = createStore({
    modules: {
        snackbar: snackbarModule
    },
    state() {
        return {
            searchQuery: '',
            contacts: []
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
        setContacts(state, payload) {
            state.contacts = payload;
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
        // working with api
        async loadContacts(context) {
            try {
                const response = await fetch('https://phonebook-60b42-default-rtdb.firebaseio.com/contacts.json');
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.errorMessage || 'Произошла ошибка при загрузке контактов');
                }

                let contacts = [];
                for (const key in responseData) {
                    contacts.push({ id: key, ...responseData[key] });
                }
                context.commit('setContacts', contacts);

                return 'Контакты загружены';
            } catch (error) {
                throw new Error(error.message || 'Произошла ошибка при загрузке контактов');
            }
        },
        async importContacts(context, payload) {
            try {
                const currentContacts = context.rootGetters.contacts;
                // юзер может ввести как массив, так и один объект
                const contactsForImport = payload.length ? payload : [payload];
                // счетчик добавленных контактов
                let importedContacts = 0;
                // счетчик недобавленных контактов
                let issues = 0;

                for (const importedContact of contactsForImport) {
                    // уже существующие контакты () не добавляются
                    const alreadyExists = currentContacts.some(
                        existed => existed.phone === importedContact.phone || existed.email === importedContact.email
                    );
                    // если у контакта не указано имя/номер, то не добавлять его
                    const isCorrect = !!(importedContact.name && importedContact.phone);

                    if (!alreadyExists && isCorrect) {
                        // форматирование контакта: добавляются только поля с корректными данными, иначе - обнуляются

                        const correctedContact = {
                            name: importedContact.name,
                            phone: importedContact.phone,
                            email: importedContact.email || '',
                            birthday: importedContact.birthday || null
                        };
                        try {
                            await context.dispatch('registerContact', correctedContact);
                        } catch (error) {
                            throw new Error('Произошла ошибка при импорте контактов');
                        }

                        importedContacts++;
                    } else issues++;
                }

                // результат импорта (были ли добавлены контакты/кол-во/причина НЕ добавления)

                const causeText = 'Возможно, введенные контакты уже существуют или они записаны некорректно';
                if (importedContacts === 0) throw new Error(`Ни один из контактов не был импортирован. ${causeText}`);
                if (issues !== 0)
                    throw new Error(
                        `Импорт завершен. Часть контактов (${issues} шт) не была импортирована. ${causeText}`
                    );

                return `Импорт завершен. Все контакты (${importedContacts} шт) были импортированы.`;
            } catch (error) {
                throw new Error(error.message || 'Произошла ошибка при импорте контактов');
            }
        },
        async registerContact(context, payload) {
            try {
                const newContact = {
                    name: payload.name,
                    phone: payload.phone,
                    email: payload.email,
                    birthday: payload.birthday
                };
                if (context.state.contacts.some(contact => contact.phone === newContact.phone))
                    throw new Error('Такой контакт уже существует');

                const response = await fetch('https://phonebook-60b42-default-rtdb.firebaseio.com/contacts.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newContact)
                });
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.errorMessage || 'Произошла ошибка при создании нового контакта');
                }

                context.commit('registerContact', { id: responseData.name, ...newContact });

                return 'Контакт добавлен';
            } catch (error) {
                throw new Error(error.message || 'Произошла ошибка при создании нового контакта');
            }
        },
        async removeContact(context, payload) {
            try {
                const contactId = payload.id;
                const contactIndex = context.getters.contacts.findIndex(contact => contact.id === contactId);

                await fetch(`https://phonebook-60b42-default-rtdb.firebaseio.com/contacts/${contactId}.json`, {
                    method: 'DELETE'
                });

                context.commit('removeContact', contactIndex);

                return 'Контакт удален';
            } catch (error) {
                throw new Error('Произошла ошибка при удалении контакта');
            }
        },
        async updateContact(context, payload) {
            try {
                const contactId = payload.id;
                const contactIndex = context.getters.contacts.findIndex(contact => contact.id === contactId);

                const response = await fetch(
                    `https://phonebook-60b42-default-rtdb.firebaseio.com/contacts/${contactId}.json`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(payload)
                    }
                );
                const responseData = await response.json();

                if (!response.ok) {
                    const error = new Error(responseData.message || 'Произошла ошибка при обновлении контакта');
                    throw error;
                }

                context.commit('updateContact', { index: contactIndex, data: payload });

                return 'Контакт обновлен';
            } catch (error) {
                throw new Error('Произошла ошибка при обновлении контакта');
            }
        }
    }
});

export default store;
