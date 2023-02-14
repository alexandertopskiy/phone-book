<template>
    <v-list density="compact" nav>
        <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :title="item.title"
            :prepend-icon="item.icon"
            :value="item.value"
        >
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    data() {
        return {
            menuItems: [
                {
                    title: 'New Contact',
                    icon: 'mdi-plus',
                    value: 'add-contact'
                },
                {
                    title: 'Import Contacts',
                    icon: 'mdi-application-import',
                    value: 'import'
                },
                {
                    title: 'Export Contacts (JSON)',
                    icon: 'mdi-code-json',
                    value: 'export-json'
                },
                {
                    title: 'Export Contacts (CSV)',
                    icon: 'mdi-table',
                    value: 'export-csv'
                },
                {
                    title: 'Export Contacts (TXT)',
                    icon: 'mdi-text-box',
                    value: 'export-txt'
                }
            ]
        };
    }
};
</script>
