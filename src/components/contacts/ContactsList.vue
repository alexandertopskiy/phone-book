<template>
    <v-list>
        <!-- Info Message -->
        <template v-if="!filteredContacts.length">
            <v-list-item>
                <v-list-item-title class="text-center">
                    <div v-if="searchQuery && searchQuery.trim()">There's no such contact</div>
                    <div v-else class="my-2">
                        <p class="my-2">You haven't add any contacts yet</p>
                        <v-btn block variant="outlined" color="blue-darken-2" @click="createContact"
                            >Add the first one!</v-btn
                        >
                    </div>
                </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
        </template>

        <!-- Contacts Counter -->
        <div v-else>
            <v-list-subheader>All contacts: {{ filteredContacts.length }}</v-list-subheader>
            <v-divider></v-divider>
        </div>

        <!-- Contacts List -->
        <template v-for="(contact, index) in filteredContacts" :key="index">
            <!-- Group/Letter -->
            <div>
                <div v-if="index === 0">
                    <v-list-subheader class="bg-teal-lighten-3">{{ getFirstLater(contact.name) }}</v-list-subheader>
                </div>
                <div v-else>
                    <v-list-subheader
                        class="bg-teal-lighten-3"
                        v-if="getFirstLater(contact.name) !== getFirstLater(filteredContacts[index - 1].name)"
                        >{{ getFirstLater(contact.name) }}</v-list-subheader
                    >
                    <v-divider v-else></v-divider>
                </div>
            </div>
            <!-- Contact -->
            <div>
                <!-- TODO: custom component -->
                {{ contact.name }}
            </div>
        </template>
    </v-list>
</template>

<script>
export default {
    computed: {
        availableContacts() {
            const allContacts = this.$store.getters.contacts;
            const sortedContacts = allContacts.slice().sort((c1, c2) => (c1.name > c2.name ? 1 : -1));
            return sortedContacts;
        },
        filteredContacts() {
            if (this.searchQuery && this.searchQuery.trim()) {
                return this.availableContacts.filter(contact => contact.name.toLowerCase().includes(this.searchQuery));
            }
            return this.availableContacts;
        },
        searchQuery() {
            return this.$store.getters.searchQuery;
        }
    },
    methods: {
        createContact() {
            console.log('creating contact...');
        },
        getFirstLater(name) {
            return name[0].toUpperCase();
        }
    }
};
</script>
