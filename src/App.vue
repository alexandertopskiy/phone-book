<template>
    <v-app id="inspire">
        <!-- Navigation Bar -->
        <NavBar />

        <!-- Content -->
        <AppContent />

        <!-- Dialog Modals -->
        <CreateContact v-if="createFormVisible" :dialog="createFormVisible" @close="closeCreateContact" />
        <!-- TODO: move all modals here -->

        <!-- Success/Failure Messages -->
        <!-- TODO: manipulate from Store -->
        <v-snackbar v-model="snackbarVisible" multi-line>
            {{ snackbarMessage }}

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbarVisible = false"> Close </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script>
import NavBar from '@/components/nav/NavBar.vue';
import AppContent from '@/components/AppContent.vue';
import CreateContact from '@/components/dialogs/CreateContact.vue';

export default {
    components: {
        NavBar,
        AppContent,
        CreateContact
    },
    provide() {
        return {
            showCreateContact: this.showCreateContact,
            showSnackbar: this.showSnackbar
        };
    },
    data() {
        return {
            createFormVisible: false,
            snackbarVisible: false,
            snackbarMessage: ''
        };
    },
    methods: {
        showCreateContact() {
            this.createFormVisible = true;
        },
        closeCreateContact() {
            this.createFormVisible = false;
        },
        showSnackbar(msg) {
            this.snackbarVisible = true;
            this.snackbarMessage = msg;
        }
    }
};
</script>

<style lang="scss">
.v-toolbar__content {
    padding: 4px 20px;
}
</style>
