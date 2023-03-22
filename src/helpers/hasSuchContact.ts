import { Contact } from '@/models/contact';

/**
 * @description Проверка, существует ли уже такой контакт, чтобы избежать дублей.
 * @param {Contact[]} contacts массив всех контактов, в которых искать дубль
 * @param {Contact} newContact новый контакт, с которым производить сравнение
 * @returns {boolean} __true__ - если есть хотя бы одно совпадение, иначе - __false__
 */
const hasSuchContact = (contacts: Contact[], newContact: Contact): boolean => {
    return contacts.some(contact => {
        // (обновление) не сравнивать с самим собой: при false будет "замыкание" и проверки телефона/почты не будет, сразу вернется false
        // (создание/импорт) newContact.id = undefined (т.к. айдишники генерятся на бэке) -> isOther = true
        const isOther = contact.id !== newContact.id;

        // совпадений по телефону/почте не должно быть, т.к. они уникальны (по имени/дате можно повторяться)
        // если у нового контакта не указан номер/почта, то не делать проверку этого поля
        const matchPhone = newContact.phone && contact.phone === newContact.phone;
        const matchMail = newContact.email && contact.email === newContact.email;

        return isOther && (matchPhone || matchMail);
    });
};

export default hasSuchContact;
