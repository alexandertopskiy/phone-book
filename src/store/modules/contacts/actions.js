import i18n from '@/i18n';
import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL + '/contacts';

export default {
    setSearchQuery(context, payload) {
        context.commit('setSearchQuery', payload);
    },
    // working with api
    async loadContacts(context) {
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;

        try {
            const url = `${baseURL}/${userId}.json?auth=${token}`;
            const { data: responseData } = await axios.get(url);

            let contacts = [];
            for (const key in responseData) {
                const contact = responseData[key];
                contacts.push({
                    id: key,
                    name: contact.name,
                    phone: contact.phone,
                    email: contact.email,
                    // если на бэк firebase отправить свойство со значением null, то свойство не добавится объекту
                    birthday: contact.birthday || null
                });
            }
            context.commit('setContacts', contacts);

            return i18n.global.t('contacts.info.success.loaded');
        } catch (_) {
            throw new Error(i18n.global.t('contacts.info.errors.loaded'));
        }
    },
    async importContacts(context, payload) {
        const currentContacts = context.state.contacts;
        // юзер может ввести как массив, так и один объект
        const contactsForImport = payload.length ? payload : [payload];
        // счетчик добавленных контактов
        let importedContacts = 0;
        // счетчик недобавленных контактов
        let issues = 0;

        try {
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
                        email: importedContact.email || null,
                        birthday: importedContact.birthday || null
                    };

                    try {
                        await context.dispatch('registerContact', correctedContact);
                    } catch (_) {
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
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const newContact = {
            name: payload.name,
            phone: payload.phone,
            email: payload.email || null,
            birthday: payload.birthday || null
        };

        if (
            context.state.contacts.some(
                contact => contact.phone === newContact.phone || contact.email === newContact.email
            )
        )
            throw new Error(i18n.global.t('contacts.info.errors.create.exist'));

        try {
            const url = `${baseURL}/${userId}.json?auth=${token}`;
            const { data: responseData } = await axios.post(url, newContact);
            context.commit('registerContact', { id: responseData.name, ...newContact });

            return i18n.global.t('contacts.info.success.create');
        } catch (_) {
            throw new Error(i18n.global.t('contacts.info.errors.create.default'));
        }
    },
    async removeContact(context, payload) {
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const contactId = payload.id;
        const contactIndex = context.getters.contacts.findIndex(contact => contact.id === contactId);

        try {
            const url = `${baseURL}/${userId}/${contactId}.json?auth=${token}`;
            await axios.delete(url);

            context.commit('removeContact', contactIndex);

            return i18n.global.t('contacts.info.success.delete');
        } catch (_) {
            throw new Error(i18n.global.t('contacts.info.errors.delete'));
        }
    },
    async updateContact(context, payload) {
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const contactId = payload.id;
        const contactIndex = context.getters.contacts.findIndex(contact => contact.id === contactId);

        if (
            context.state.contacts.some(contact => {
                // не сравнивать с самим собой
                const isOther = contact.id !== payload.id;
                // совпадений по телефону/почте не должно быть, т.к. они уникальны (по имени/дате - можно)
                const matchPhone = contact.phone === payload.phone;
                const matchMail = contact.email === payload.email;

                return isOther && (matchPhone || matchMail);
            })
        )
            throw new Error(i18n.global.t('contacts.info.errors.update.exist'));

        try {
            const url = `${baseURL}/${userId}/${contactId}.json?auth=${token}`;
            await axios.put(url, payload);

            context.commit('updateContact', { index: contactIndex, data: payload });

            return i18n.global.t('contacts.info.success.update');
        } catch (_) {
            throw new Error(i18n.global.t('contacts.info.errors.update.default'));
        }
    }
};
