<template>
    <v-app id="inspire">
        <!-- Navigation Bar -->
        <NavBar />

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
                            <ContactsList />
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <!-- Dialog Modals -->
        <CreateContact v-if="showCreate" :dialog="showCreate" @close="closeCreate" />
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
    data() {
        return {
            showCreate: false
        };
    },
    methods: {
        createContact() {
            console.log('creating contact...');
            this.showCreate = true;
        },
        closeCreate() {
            console.log('closing creating contact...');
            this.showCreate = false;
        }
    }
};
</script>

<style lang="scss">
.v-toolbar__content {
    padding: 4px 20px;
}
</style>
