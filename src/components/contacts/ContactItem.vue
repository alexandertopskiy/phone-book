<template>
    <v-expansion-panel rounded="0">
        <!-- Activator (карточка контакта) -->
        <v-expansion-panel-title class="py-2 pl-0">
            <v-list-item :title="name" :subtitle="phone" :prepend-avatar="dummyImage" ref="item"></v-list-item>
        </v-expansion-panel-title>

        <!-- Выпадающая часть -->
        <v-expansion-panel-text>
            <!-- Информация -->
            <div class="d-flex flex-wrap justify-start py-2 with-gap">
                <CopiedButton :title="$t('contacts.list.item.info.phone')" :data="phone" />
                <CopiedButton v-if="!!email" :title="$t('contacts.list.item.info.email')" :data="email" />
                <CopiedButton v-if="!!birthday" :title="$t('contacts.list.item.info.birthday')" :data="birthday" />
            </div>
            <!-- Кнопки действия -->
            <div class="d-flex flex-wrap align-center justify-center py-2 with-gap">
                <v-btn @click="callContact" text variant="outlined" color="success" class="flex-grow-1">
                    <v-icon class="mr-sm-3">mdi-phone</v-icon>
                    <span class="d-none d-sm-block">
                        {{ $t('contacts.list.item.buttons.call') }}
                    </span>
                </v-btn>
                <v-btn @click="writeContact" text variant="outlined" color="success" class="flex-grow-1" v-if="email">
                    <v-icon class="mr-sm-3">mdi-email</v-icon>
                    <span class="d-none d-sm-block">
                        {{ $t('contacts.list.item.buttons.write') }}
                    </span>
                </v-btn>
                <v-btn @click="editContact" icon variant="outlined" size="small" color="blue">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="deleteContact" icon variant="outlined" size="small" color="red">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
export default {
    props: ['id', 'name', 'phone', 'email', 'birthday'],
    inject: ['showEditContact', 'showDeleteContact'],
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
            this.showDeleteContact(this.id);
        }
    }
};
</script>

<style scoped>
.with-gap {
    gap: 0.5rem;
}
</style>
