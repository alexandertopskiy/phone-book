<template>
    <BaseSpinner v-if="isLoading" class="my-16" />
    <v-list v-else>
        <!-- Info Message -->
        <template v-if="!filteredContacts.length">
            <v-list-item>
                <v-list-item-title class="text-center">
                    <div v-if="searchQuery && searchQuery.trim()">
                        {{ $t('contacts.emptyList.notFound') }}
                    </div>
                    <div v-else class="my-2">
                        <p class="my-2">
                            {{ $t('contacts.emptyList.noContacts.title') }}
                        </p>
                        <v-btn block variant="outlined" color="blue-darken-2" @click="createContact">
                            {{ $t('contacts.emptyList.noContacts.btnTitle') }}
                        </v-btn>
                    </div>
                </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
        </template>

        <!-- Contacts Counter -->
        <div v-else>
            <v-list-subheader>
                {{ $t('contacts.list.counterTitle') + filteredContacts.length }}
            </v-list-subheader>
            <v-divider></v-divider>
        </div>

        <!-- Contacts List -->
        <transition-group name="collapsed-contact">
            <template v-for="(contact, index) in filteredContacts" :key="contact.id">
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
                    <!-- TODO: expand only one at time -->
                    <!-- https://vuetifyjs.com/en/components/expansion-panels/#expansion-panels -->
                    <ContactItem
                        :id="contact.id"
                        :name="contact.name"
                        :phone="contact.phone"
                        :email="contact.email"
                        :birthday="contact.birthday"
                        class="my-2"
                    />
                </div>
            </template>
        </transition-group>
    </v-list>
</template>

<script>
import ContactItem from '@/components/contacts/ContactItem.vue';

export default {
    components: {
        ContactItem
    },
    inject: ['showCreateContact'],
    data() {
        return {
            isLoading: false
        };
    },
    computed: {
        availableContacts() {
            const allContacts = this.$store.getters['contacts/contacts'];
            const sortedContacts = allContacts.slice().sort((c1, c2) => (c1.name > c2.name ? 1 : -1));

            return sortedContacts;
        },
        filteredContacts() {
            if (this.searchQuery && this.searchQuery.trim()) {
                return this.availableContacts.filter(contact => {
                    const nameMatch = contact.name.toLowerCase().includes(this.searchQuery.toLowerCase());
                    const numberMatch = contact.phone.toLowerCase().includes(this.searchQuery.toLowerCase());

                    // поиск для российских номеров ("+7" и "8" - одно и то же)
                    let rusNumMatch = false;
                    if (this.searchQuery.startsWith('+7') && contact.phone.startsWith('8')) {
                        const contactPart = contact.phone.slice(2);
                        const queryPart = this.searchQuery.slice(3);
                        rusNumMatch = contactPart.includes(queryPart);
                    } else if (this.searchQuery.startsWith('8') && contact.phone.startsWith('+7')) {
                        const contactPart = contact.phone.slice(3);
                        const queryPart = this.searchQuery.slice(2);
                        rusNumMatch = contactPart.includes(queryPart);
                    }

                    return nameMatch || numberMatch || rusNumMatch;
                });
            }
            return this.availableContacts;
        },
        searchQuery() {
            return this.$store.getters['contacts/searchQuery'];
        }
    },
    methods: {
        createContact() {
            this.showCreateContact();
        },
        getFirstLater(name) {
            return name[0].toUpperCase();
        },
        async loadContacts() {
            this.isLoading = true;
            try {
                const message = await this.$store.dispatch('contacts/loadContacts');
                this.$store.dispatch('snackbar/showSnackbar', { message, type: 'success' });
            } catch (error) {
                this.$store.dispatch('snackbar/showSnackbar', { message: error.message, type: 'failure' });
            }
            this.isLoading = false;
        }
    },
    created() {
        this.loadContacts();
    }
};
</script>

<style lang="scss" scoped>
.collapsed-contact-enter-from {
    opacity: 0;
}
.collapsed-contact-enter-active {
    transition: all 0.3s ease-out;
}
.collapsed-contact-enter-to {
    opacity: 1;
}

.collapsed-contact-leave-from {
    opacity: 1;
    transform: translateX(0);
}
.collapsed-contact-leave-active {
    transition: all 0.3s ease-in;
}
.collapsed-contact-leave-to {
    opacity: 0;
    transform: translateX(-550px);
}
</style>
