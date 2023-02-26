<template>
    <v-main>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <v-card max-width="600" class="mx-auto">
                        <v-toolbar color="teal-lighten-1" dark>
                            <v-text-field
                                class="ml-3"
                                density="compact"
                                variant="solo"
                                clearable
                                single-line
                                hide-details
                                prepend-inner-icon="mdi-text-box-search-outline"
                                label="Search a contact"
                                placeholder="Search a contact"
                                :value="enteredTerm"
                                @input="updateEnteredTerm($event.target.value)"
                                @click:clear="updateEnteredTerm('')"
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

export default {
    components: {
        ContactsList
    },
    inject: ['showCreateContact'],
    data() {
        return {
            enteredTerm: ''
        };
    },
    methods: {
        updateEnteredTerm(newValue) {
            this.enteredTerm = newValue;
        }
    },
    watch: {
        enteredTerm(newValue) {
            // задержка поиска (чтобы не обновлять с каждой новой буквой, а подождать 0.3с)
            setTimeout(() => {
                if (newValue === this.enteredTerm) this.$store.dispatch('contacts/setSearchQuery', newValue);
            }, 300);
        }
    }
};
</script>
