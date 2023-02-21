<template>
    <!-- TODO: переделать на v-expansion-panel -->
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
            <div class="d-flex flex-wrap align-center justify-center px-4 py-2 with-gap">
                <v-btn @click="callContact" text variant="outlined" color="success" class="flex-grow-1">
                    <v-icon class="mr-sm-3">mdi-phone</v-icon>
                    <span class="d-none d-sm-block">Call</span>
                </v-btn>
                <v-btn @click="writeContact" text variant="outlined" color="success" class="flex-grow-1" v-if="email">
                    <v-icon class="mr-sm-3">mdi-email</v-icon>
                    <span class="d-none d-sm-block">Write</span>
                </v-btn>
                <v-btn @click="editContact" icon variant="outlined" size="small" color="blue">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="deleteContact" icon variant="outlined" size="small" color="red">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
        </v-list-item>
    </v-list-group>
</template>

<script>
export default {
    props: ['id', 'name', 'phone', 'email', 'birthday'],
    emits: ['deleteContact'],
    inject: ['showEditContact'],
    data() {
        return {
            editFormVisible: false
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
            window.open('tel:' + this.phone);
        },
        writeContact() {
            window.open('mailto:' + this.email);
        },
        editContact() {
            this.showEditContact(this.id);
        },
        deleteContact() {
            this.$emit('deleteContact', this.id);
        }
    }
};
</script>

<style scoped>
.with-gap {
    gap: 0.5rem;
}
</style>
