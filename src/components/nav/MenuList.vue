<template>
    <div class="menu">
        <v-list density="compact" nav>
            <template v-for="item in menuItems" :key="item.value">
                <!-- v-list-item также имеет пропс value для запоминания селекта :value="subitem.value" -->
                <v-list-item
                    v-if="!item.subItems"
                    :title="item.title"
                    :prepend-icon="item.icon"
                    :class="item.class"
                    @click="onClickMenu(item.action)"
                >
                </v-list-item>
                <v-list-group v-else :value="item.value">
                    <template #activator="{ props }">
                        <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title"></v-list-item>
                    </template>

                    <v-list-item
                        v-for="subitem in item.subItems"
                        :key="subitem.value"
                        :title="subitem.title"
                        :prepend-icon="subitem.icon"
                        @click="onClickMenu(subitem.action)"
                    >
                    </v-list-item>
                </v-list-group>
            </template>
        </v-list>
        <div class="footer">
            <LangSwitch />

            <p class="text-center text-body-2">
                view
                <a href="https://github.com/alexandertopskiy/phone-book" target="_blank"
                    >GitHub project <v-icon>mdi-github</v-icon></a
                >
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Contact } from '@/models/contact';

export default {
    inject: ['showCreateContact', 'showImportContacts', 'showDeleteContact'],
    emits: ['closeMenu'],
    computed: {
        menuItems() {
            return [
                {
                    title: this.$t('navBar.menuItems.create'),
                    icon: 'mdi-plus',
                    value: 'add-contact',
                    action: 'create'
                },
                {
                    title: this.$t('navBar.menuItems.import'),
                    icon: 'mdi-application-import',
                    value: 'import',
                    action: 'import'
                },
                {
                    title: this.$t('navBar.menuItems.export'),
                    value: 'export',
                    icon: 'mdi-application-export',
                    subItems: [
                        {
                            title: 'JSON',
                            icon: 'mdi-code-json',
                            value: 'export-json',
                            action: 'export-json'
                        },
                        {
                            title: 'CSV',
                            icon: 'mdi-table',
                            value: 'export-csv',
                            action: 'export-csv'
                        },
                        {
                            title: 'TXT',
                            icon: 'mdi-text-box',
                            value: 'export-txt',
                            action: 'export-txt'
                        }
                    ]
                },
                {
                    title: this.$t('navBar.menuItems.removeAll'),
                    icon: 'mdi-trash-can-outline',
                    value: 'remove',
                    action: 'removeAll',
                    class: 'text-red'
                }
            ];
        }
    },
    methods: {
        onClickMenu(action: string) {
            switch (action) {
                case 'create':
                    this.showCreateContact();
                    break;
                case 'import':
                    this.showImportContacts();
                    break;
                case 'removeAll':
                    this.showDeleteContact(null);
                    break;
                case 'export-json':
                    this.exportContacts('json');
                    break;
                case 'export-csv':
                    this.exportContacts('csv');
                    break;
                case 'export-txt':
                    this.exportContacts('txt');
                    break;
                default:
                    break;
            }

            this.$emit('closeMenu');
        },
        exportContacts(format: string) {
            // создаем глубокую копию, т.к. contacts - это массив объектов, и изменения объектов затронут стор
            const contactCopy = JSON.parse(JSON.stringify(this.$store.getters['contacts/contacts']));

            if (!contactCopy.length) {
                this.$store.dispatch('snackbar/showSnackbar', {
                    message: this.$t('export.emptyList'),
                    type: 'failure'
                });
                return;
            }

            // удаление свойства id (при импорте/создании контакта бэк сам генерит id)
            contactCopy.forEach((contact: Contact) => delete contact['id']);

            if (format === 'json') this.download(JSON.stringify(contactCopy), format);
            else if (format === 'txt') this.download(this.convertToPlainText(contactCopy), format);
            else if (format === 'csv') this.download(this.convertToCSV(contactCopy), format);
        },
        convertToPlainText(contacts: Contact[]): string {
            let output = '';

            for (const [index, contact] of contacts.entries()) {
                output += this.$t('export.plainText.index') + (index + 1) + '\n';
                output += this.$t('export.plainText.name') + contact.name + '\n';
                output += this.$t('export.plainText.number') + contact.phone + '\n';
                if (contact.email) output += this.$t('export.plainText.email') + contact.email + '\n';
                if (contact.birthday) output += this.$t('export.plainText.birthday') + contact.birthday + '\n';
                output += '\n';
            }

            return output;
        },
        convertToCSV(contacts: Contact[]): string {
            // ',' - перевод на новый столбец
            // '\r\n' - перевод на новую строку

            // заголовок таблицы (названия полей)
            let csv = this.$t('export.titleCSV');

            for (const [index, contact] of contacts.entries()) {
                csv += index + 1 + ',' + contact.name + ',' + contact.phone + ',';
                csv += contact.email ? contact.email + ',' : ',';
                if (contact.birthday) csv += contact.birthday;
                csv += '\r\n';
            }

            return csv;
        },
        download(text: string, format = 'txt') {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/' + format + ';charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'exported_contacts (' + this.$i18n.locale + ').' + format);

            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
};
</script>

<style scoped lang="scss">
.menu {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        a {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;

            text-decoration: none;
            color: #26a69a;

            &:hover,
            &:active {
                color: #b2dfdb;
            }
        }
    }
}
</style>
