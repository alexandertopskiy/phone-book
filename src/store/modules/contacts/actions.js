import i18n from '@/i18n';
import axios from 'axios';
import hasSuchContact from '@/helpers/hasSuchContact.js';

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
                    // если на бэк firebase отправлен объект, чье свойство - со значением null, то это свойство не добавится объекту
                    ...(contact.email && { email: contact.email }),
                    ...(contact.birthday && { birthday: contact.birthday })
                });
            }
            context.commit('setContacts', contacts);

            return i18n.global.t('contacts.info.success.loaded');
        } catch (_) {
            throw new Error(i18n.global.t('contacts.info.errors.loaded'));
        }
    },
    async importContacts(context, payload) {
        // юзер может ввести как массив, так и один объект
        const contactsForImport = payload.length ? payload : [payload];
        // счетчик добавленных контактов
        let importedContacts = 0;
        // счетчик недобавленных контактов
        let issues = 0;

        try {
            for (const importedContact of contactsForImport) {
                // если у контакта не указано имя/номер, то не добавлять его
                const isCorrect = !!(importedContact.name && importedContact.phone);
                // также проверка на дубли
                if (isCorrect && !hasSuchContact(context.state.contacts, importedContact)) {
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
            if (issues !== 0) return i18n.global.t('contacts.info.errors.import.duplicate.partly', { issues });

            return i18n.global.t('contacts.info.success.import', { count: importedContacts });
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
            // если на бэк firebase отправлен объект, чье свойство - со значением null, то это свойство не добавится объекту
            email: payload.email || null,
            birthday: payload.birthday || null
        };

        // проверка на дублирование
        if (hasSuchContact(context.state.contacts, newContact))
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

        // проверка на дублирование
        if (hasSuchContact(context.state.contacts, payload))
            throw new Error(i18n.global.t('contacts.info.errors.update.exist'));

        try {
            const url = `${baseURL}/${userId}/${contactId}.json?auth=${token}`;
            await axios.put(url, payload);

            context.commit('updateContact', { index: contactIndex, data: payload });

            return i18n.global.t('contacts.info.success.update');
        } catch (_) {
            throw new Error(i18n.global.t('contacts.info.errors.update.default'));
        }
    },
    // "Онбординг" - добавление важных контактов при регистарции
    async setDefaultContacts(context) {
        const defaultContacts = [
            { name: 'Полиция', phone: '102' },
            { name: 'Пожарная служба', phone: '101' },
            { name: 'Скорая помощь', phone: '103' },
            { name: 'Единый номер экстренных служб', phone: '112' }
        ];
        try {
            await context.dispatch('importContacts', defaultContacts);
        } catch (error) {
            throw new Error('Ошибка при добавлении базовых контактов');
        }
    }
};
