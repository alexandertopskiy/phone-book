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
        <ResultMessage />
    </v-app>
</template>

<script>
import NavBar from '@/components/nav/NavBar.vue';
import AppContent from '@/components/AppContent.vue';
import CreateContact from '@/components/dialogs/CreateContact.vue';
import ResultMessage from '@/components/ui/ResultMessage.vue';

export default {
    components: {
        NavBar,
        AppContent,
        CreateContact,
        ResultMessage
    },
    provide() {
        return {
            showCreateContact: this.showCreateContact
        };
    },
    data() {
        return {
            createFormVisible: false
        };
    },
    methods: {
        showCreateContact() {
            this.createFormVisible = true;
        },
        closeCreateContact() {
            this.createFormVisible = false;
        }
    }
};
</script>

<style lang="scss">
.v-toolbar__content {
    padding: 4px 20px;
}
</style>
