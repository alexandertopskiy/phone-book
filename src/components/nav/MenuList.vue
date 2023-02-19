<template>
    <v-list density="compact" nav>
        <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :title="item.title"
            :prepend-icon="item.icon"
            :value="item.value"
            @click="onClickMenu(item.action)"
        >
        </v-list-item>

        <ImportContacts v-if="showImport" :dialog="showImport" @close="closeImport" />
    </v-list>
</template>

<script>
import ImportContacts from '@/components/dialogs/ImportContacts.vue';

export default {
    components: {
        ImportContacts
    },
    inject: ['createContact'],
    emits: ['closeMenu'],
    data() {
        return {
            showImport: false,
            menuItems: [
                {
                    title: 'New Contact',
                    icon: 'mdi-plus',
                    // TODO: check if it's needed
                    value: 'add-contact',
                    action: 'create'
                },
                {
                    title: 'Import Contacts',
                    icon: 'mdi-application-import',
                    value: 'import',
                    action: 'import'
                },
                // TODO: Сделать выпадающим списком
                {
                    title: 'Export Contacts (JSON)',
                    icon: 'mdi-code-json',
                    value: 'export-json',
                    action: 'export-json'
                },
                {
                    title: 'Export Contacts (CSV)',
                    icon: 'mdi-table',
                    value: 'export-csv',
                    action: 'export-csv'
                },
                {
                    title: 'Export Contacts (TXT)',
                    icon: 'mdi-text-box',
                    value: 'export-txt',
                    action: 'export-txt'
                }
            ]
        };
    },
    methods: {
        onClickMenu(action) {
            switch (action) {
                case 'create':
                    this.createContact();
                    break;
                case 'import':
                    this.importContacts();
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
            console.log(`export (${format})`);
        },
        importContacts() {
            this.showImport = true;
        },
        closeImport() {
            this.showImport = false;
        }
    }
};
</script>
