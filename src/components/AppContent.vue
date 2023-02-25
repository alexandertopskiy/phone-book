<template>
    <v-main>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <v-card max-width="600" class="mx-auto">
                        <v-toolbar color="teal-lighten-1" dark>
                            <v-text-field
                                density="compact"
                                variant="solo"
                                clearable
                                single-line
                                hide-details
                                prepend-inner-icon="mdi-text-box-search-outline"
                                label="Search a contact"
                                placeholder="Search a contact"
                                :value="enteredValue"
                                @input="setSearchQuery($event.target.value)"
                                @click:clear="setSearchQuery('')"
                            ></v-text-field>
                            <v-btn icon class="ml-5" @click="showCreateContact">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <ContactsList />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import ContactsList from '@/components/contacts/ContactsList.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        ContactsList
    },
    inject: ['showCreateContact'],
    computed: mapGetters('contacts', { enteredValue: 'searchQuery' }),
    methods: mapActions('contacts', ['setSearchQuery'])
};
</script>

<style></style>
