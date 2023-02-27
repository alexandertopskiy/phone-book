import i18n from '@/i18n';

const baseURL = 'https://phonebook-60b42-default-rtdb.firebaseio.com/contacts';

export default {
    setSearchQuery(context, payload) {
        context.commit('setSearchQuery', payload);
    },
    // working with api
    async loadContacts(context) {
        try {
            const userId = context.rootGetters.userId;
            const token = context.rootGetters.token;
            const response = await fetch(`${baseURL}/${userId}.json?auth=${token}`);
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.errorMessage || i18n.global.t('contacts.info.errors.loaded'));
            }

            let contacts = [];
            for (const key in responseData) {
                contacts.push({ id: key, ...responseData[key] });
            }
            context.commit('setContacts', contacts);

            return i18n.global.t('contacts.info.success.loaded');
        } catch (error) {
            throw new Error(error.message || i18n.global.t('contacts.info.errors.loaded'));
        }
    },
    async importContacts(context, payload) {
        try {
            const currentContacts = context.state.contacts;
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
                        throw new Error(i18n.global.t('contacts.info.errors.import.default'));
                    }

                    importedContacts++;
                } else issues++;
            }

            // результат импорта (были ли добавлены контакты/кол-во/причина НЕ добавления)

            if (importedContacts === 0) throw new Error(i18n.global.t('contacts.info.errors.import.duplicate.all'));
            if (issues !== 0)
                throw new Error(
                    i18n.global.t('contacts.info.errors.import.duplicate.partly.start') +
                        issues +
                        i18n.global.t('contacts.info.errors.import.duplicate.partly.end')
                );

            return (
                i18n.global.t('contacts.info.success.import.start') +
                importedContacts +
                i18n.global.t('contacts.info.success.import.end')
            );
        } catch (error) {
            throw new Error(error.message || i18n.global.t('contacts.info.errors.import.default'));
        }
    },
    async registerContact(context, payload) {
        try {
            const userId = context.rootGetters.userId;
            const token = context.rootGetters.token;
            const newContact = {
                name: payload.name,
                phone: payload.phone,
                email: payload.email,
                birthday: payload.birthday
            };
            if (context.state.contacts.some(contact => contact.phone === newContact.phone))
                throw new Error(i18n.global.t('contacts.info.errors.create.exist'));

            const response = await fetch(`${baseURL}/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)
            });
            const responseData = await response.json();

            if (!response.ok)
                throw new Error(responseData.errorMessage || i18n.global.t('contacts.info.errors.create.default'));

            context.commit('registerContact', { id: responseData.name, ...newContact });

            return i18n.global.t('contacts.info.success.create');
        } catch (error) {
            throw new Error(error.message || i18n.global.t('contacts.info.errors.create.default'));
        }
    },
    async removeContact(context, payload) {
        try {
            const userId = context.rootGetters.userId;
            const token = context.rootGetters.token;
            const contactId = payload.id;
            const contactIndex = context.getters.contacts.findIndex(contact => contact.id === contactId);

            await fetch(`${baseURL}/${userId}/${contactId}.json?auth=${token}`, {
                method: 'DELETE'
            });

            context.commit('removeContact', contactIndex);

            return i18n.global.t('contacts.info.success.delete');
        } catch (error) {
            throw new Error(i18n.global.t('contacts.info.errors.delete'));
        }
    },
    async updateContact(context, payload) {
        try {
            const userId = context.rootGetters.userId;
            const token = context.rootGetters.token;
            const contactId = payload.id;
            const contactIndex = context.getters.contacts.findIndex(contact => contact.id === contactId);

            const response = await fetch(`${baseURL}/${userId}/${contactId}.json?auth=${token}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
            const responseData = await response.json();

            if (!response.ok) throw new Error(responseData.message || i18n.global.t('contacts.info.errors.update'));

            context.commit('updateContact', { index: contactIndex, data: payload });

            return i18n.global.t('contacts.info.success.update');
        } catch (error) {
            throw new Error(i18n.global.t('contacts.info.errors.update'));
        }
    }
};
