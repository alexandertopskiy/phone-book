<template>
    <v-app id="inspire">
        <!-- Navigation Bar -->
        <NavBar />

        <!-- Content -->
        <AppContent />

        <!-- Dialog Modals -->
        <CreateContact v-if="createFormVisible" :dialog="createFormVisible" @close="closeCreateContact" />
        <EditContact v-if="editFormVisible" :dialog="editFormVisible" @close="closeEditContact" :id="editedContactId" />
        <ImportContacts v-if="importFormVisible" :dialog="importFormVisible" @close="closeImportContacts" />

        <!-- Success/Failure Messages -->
        <ResultMessage />
    </v-app>
</template>

<script>
import NavBar from '@/components/nav/NavBar.vue';
import AppContent from '@/components/AppContent.vue';
import CreateContact from '@/components/dialogs/CreateContact.vue';
import EditContact from '@/components/dialogs/EditContact.vue';
import ImportContacts from '@/components/dialogs/ImportContacts.vue';
import ResultMessage from '@/components/ui/ResultMessage.vue';
import { useCreateContact, useEditContact, useImportContacts } from '@/hooks/useModals.js';

export default {
    components: {
        NavBar,
        AppContent,
        CreateContact,
        EditContact,
        ImportContacts,
        ResultMessage
    },
    provide() {
        return {
            showCreateContact: this.showCreateContact,
            showEditContact: this.showEditContact,
            showImportContacts: this.showImportContacts
        };
    },
    setup() {
        const { createFormVisible, showCreateContact, closeCreateContact } = useCreateContact();
        const { editFormVisible, editedContactId, showEditContact, closeEditContact } = useEditContact();
        const { importFormVisible, showImportContacts, closeImportContacts } = useImportContacts();

        return {
            // creating
            createFormVisible,
            showCreateContact,
            closeCreateContact,
            // editing
            editFormVisible,
            editedContactId,
            showEditContact,
            closeEditContact,
            // importing
            importFormVisible,
            showImportContacts,
            closeImportContacts
        };
    }
};
</script>

<style lang="scss">
.v-toolbar__content {
    padding: 4px 20px;
}
</style>
