<template>
    <v-list density="compact" nav>
        <template v-for="item in menuItems" :key="item.value">
            <v-list-item
                v-if="!item.subItems"
                :title="item.title"
                :prepend-icon="item.icon"
                :value="item.value"
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
                    :value="subitem.value"
                    @click="onClickMenu(subitem.action)"
                >
                </v-list-item>
            </v-list-group>
        </template>
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
                {
                    title: 'Export',
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
            console.log(`export (${format})`);
        }
    }
};
</script>
