<template>
    <v-list density="compact" nav>
        <template v-for="item in menuItems" :key="item.value">
            <!-- v-list-item также имеет пропс value для запоминания селекта :value="subitem.value" -->
            <v-list-item
                v-if="!item.subItems"
                :title="item.title"
                :prepend-icon="item.icon"
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

        <v-list-item>
            <LangSwitch />
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    inject: ['showCreateContact', 'showImportContacts'],
    emits: ['closeMenu'],
    data() {
        return {
            menuItems: [
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
                }
            ]
        };
    },
    methods: {
        onClickMenu(action) {
            switch (action) {
                case 'create':
                    this.showCreateContact();
                    break;
                case 'import':
                    this.showImportContacts();
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
            }

            this.$emit('closeMenu');
        },
        exportContacts(format) {
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
            contactCopy.forEach(contact => delete contact['id']);

            if (format === 'json') this.download(JSON.stringify(contactCopy), format);
            else if (format === 'txt') this.download(this.convertToPlainText(contactCopy), format);
            else if (format === 'csv') this.download(this.convertToCSV(contactCopy), format);
        },
        convertToPlainText(contacts) {
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
        convertToCSV(contacts) {
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
        download(text, format = 'txt') {
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
