<template>
    <v-app id="inspire">
        <!-- Navigation Bar -->
        <NavBar />

        <!-- Content -->
        <router-view v-slot="{ Component }">
            <transition name="route" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>

        <!-- Dialog Modals -->
        <CreateContact
            v-if="createFormVisible && !didAutoLogout"
            :dialog="createFormVisible"
            @close="closeCreateContact"
        />
        <EditContact
            v-if="editFormVisible && !didAutoLogout"
            :dialog="editFormVisible"
            @close="closeEditContact"
            :id="editedContactId"
        />
        <ImportContacts
            v-if="importFormVisible && !didAutoLogout"
            :dialog="importFormVisible"
            @close="closeImportContacts"
        />
        <DeleteContact
            v-if="deleteFormVisible && !didAutoLogout"
            :dialog="deleteFormVisible"
            @close="closeDeleteContact"
            :id="deletedContactId"
        />

        <!-- Success/Failure Messages -->
        <ResultMessage />
    </v-app>
</template>

<script>
import NavBar from '@/components/nav/NavBar.vue';
import CreateContact from '@/components/dialogs/CreateContact.vue';
import EditContact from '@/components/dialogs/EditContact.vue';
import ImportContacts from '@/components/dialogs/ImportContacts.vue';
import DeleteContact from '@/components/dialogs/DeleteContact.vue';

import { useCreateContact, useEditContact, useImportContacts, useDeleteContact } from '@/hooks/useModals.js';

export default {
    components: {
        NavBar,
        CreateContact,
        EditContact,
        ImportContacts,
        DeleteContact
    },
    provide() {
        return {
            showCreateContact: this.showCreateContact,
            showEditContact: this.showEditContact,
            showImportContacts: this.showImportContacts,
            showDeleteContact: this.showDeleteContact
        };
    },
    setup() {
        const { createFormVisible, showCreateContact, closeCreateContact } = useCreateContact();
        const { editFormVisible, editedContactId, showEditContact, closeEditContact } = useEditContact();
        const { importFormVisible, showImportContacts, closeImportContacts } = useImportContacts();
        const { deleteFormVisible, deletedContactId, showDeleteContact, closeDeleteContact } = useDeleteContact();

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
            closeImportContacts,
            // deleting
            deleteFormVisible,
            deletedContactId,
            showDeleteContact,
            closeDeleteContact
        };
    },
    created() {
        this.$store.dispatch('tryLogin');
    },
    computed: {
        didAutoLogout() {
            return this.$store.getters.didAutoLogout;
        },
        locale() {
            return this.$i18n.locale;
        }
    },

    watch: {
        didAutoLogout(curVal, oldVal) {
            if (curVal && curVal !== oldVal) {
                this.$router.replace('/auth');
                this.$store.dispatch('snackbar/showSnackbar', {
                    message: this.$t('auth.info.autoLogoutMessage'),
                    type: 'success'
                });
            }
        },
        locale(newValue) {
            localStorage.setItem('locale', newValue);
        }
    }
};
</script>

<style>
/* Animation */
.route-enter-from {
    transform: translateY(30px);
    opacity: 0;
}
.route-enter-active {
    transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.route-leave-active {
    transition: all 0.3s ease-in;
}
.route-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}
</style>
