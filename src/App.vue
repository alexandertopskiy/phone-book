<template>
    <v-app id="inspire">
        <NavBar />
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
    </v-app>
</template>

<script>
import NavBar from '@/components/nav/NavBar.vue';
import TextField from '@/components/ui/TextField.vue';
import ContactsList from '@/components/contacts/ContactsList.vue';

export default {
    components: {
        NavBar,
        TextField,
        ContactsList
    },
    data() {
        return {};
    },
    methods: {
        createContact() {
            console.log('creating contact...');
        }
    }
};
</script>

<style lang="scss">
.v-toolbar__content {
    padding: 4px 20px;
}
</style>
