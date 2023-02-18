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
    </v-list>
</template>

<script>
export default {
    inject: ['createContact'],
    data() {
        return {
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
                    console.log('creating');
                    this.createContact();
                    break;

                default:
                    console.log('other action');
                    break;
            }
        }
    }
};
</script>
