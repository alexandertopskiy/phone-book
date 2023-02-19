<template>
    <v-list-group :value="id" fluid>
        <!-- Activator (карточка контакта) -->
        <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                :title="name"
                :subtitle="phone"
                :prepend-avatar="dummyImage"
                ref="item"
            ></v-list-item>
        </template>

        <!-- Выпадающая часть -->
        <v-list-item class="px-4 py-2">
            <div class="d-flex flex-wrap align-center px-4 py-2">
                <v-btn @click="callContact" text variant="outlined" color="success" class="flex-grow-1">
                    <v-icon class="mr-sm-3">mdi-phone</v-icon>
                    <span class="d-none d-sm-block">Call</span>
                </v-btn>
                <v-btn
                    @click="writeContact"
                    text
                    variant="outlined"
                    color="success"
                    class="flex-grow-1 ml-2"
                    v-if="email"
                >
                    <v-icon class="mr-sm-3">mdi-email</v-icon>
                    <span class="d-none d-sm-block">Write</span>
                </v-btn>
                <v-btn @click="editContact" icon variant="outlined" size="small" color="blue" class="ml-2">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                    @click="this.$emit('deleteContact', this.id)"
                    icon
                    variant="outlined"
                    size="small"
                    color="red"
                    class="ml-2"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
        </v-list-item>

        <EditContact
            v-if="showEdit"
            :dialog="showEdit"
            :id="id"
            @close="closeEdit"
            @show-snackbar="this.$emit('showSnackbar', $event)"
        />
    </v-list-group>
</template>

<script>
import EditContact from '@/components/dialogs/EditContact.vue';

export default {
    components: {
        EditContact
    },
    props: ['id', 'name', 'phone', 'email', 'birthday'],
    emits: ['deleteContact', 'showSnackbar'],
    data() {
        return {
            showEdit: false
        };
    },
    computed: {
        dummyImage() {
            const [firstLetter, secondLetter] = this.name.split(' ').map(word => word[0]);
            return `https://dummyimage.com/150x150/80cbc4/ffffff.gif&text=${firstLetter ?? ''}${secondLetter ?? ''}`;
        }
    },
    methods: {
        callContact() {
            console.log('Calling Contact...');
            window.open('tel:' + this.phone);
        },
        writeContact() {
            console.log('Writing Contact...');
            window.open('mailto:' + this.email);
        },
        editContact() {
            this.showEdit = true;
        },
        closeEdit() {
            this.showEdit = false;
        }
    }
};
</script>
