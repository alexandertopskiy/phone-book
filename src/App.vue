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
        <!-- TODO: move all modals here -->

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
    data() {
        return {
            createFormVisible: false,
            editFormVisible: false,
            importFormVisible: false,
            editedContactId: null
        };
    },
    methods: {
        showCreateContact() {
            this.createFormVisible = true;
        },
        closeCreateContact() {
            this.createFormVisible = false;
        },
        showEditContact(id) {
            this.editedContactId = id;
            this.editFormVisible = true;
        },
        closeEditContact() {
            this.editedContactId = null;
            this.editFormVisible = false;
        },
        showImportContacts() {
            this.importFormVisible = true;
        },
        closeImportContacts() {
            this.importFormVisible = false;
        }
    }
};
</script>

<style lang="scss">
.v-toolbar__content {
    padding: 4px 20px;
}
</style>
