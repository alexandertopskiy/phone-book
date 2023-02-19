<template>
    <v-app id="inspire">
        <!-- Navigation Bar -->
        <NavBar @show-snackbar="showSnackbar" />

        <!-- Content -->
        <v-main>
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <v-card max-width="600" class="mx-auto">
                            <v-toolbar color="teal-lighten-1" dark>
                                <TextField />
                                <v-btn icon class="ml-5" @click="createContact">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <ContactsList @show-snackbar="showSnackbar" />
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <!-- Dialog Modals -->
        <CreateContact v-if="showCreate" :dialog="showCreate" @close="closeCreate" @show-snackbar="showSnackbar" />

        <!-- Success/Failure Messages -->
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
import TextField from '@/components/ui/TextField.vue';
import ContactsList from '@/components/contacts/ContactsList.vue';
import CreateContact from '@/components/dialogs/CreateContact.vue';

export default {
    components: {
        NavBar,
        TextField,
        ContactsList,
        CreateContact
    },
    provide() {
        return {
            createContact: this.createContact
        };
    },
    data() {
        return {
            showCreate: false,
            snackbarVisible: false,
            snackbarMessage: ''
        };
    },
    methods: {
        createContact() {
            this.showCreate = true;
        },
        closeCreate() {
            this.showCreate = false;
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
