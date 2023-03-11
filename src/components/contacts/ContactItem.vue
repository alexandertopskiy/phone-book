<template>
    <v-expansion-panel rounded="0" :value="id">
        <!-- Activator (карточка контакта) -->
        <v-expansion-panel-title class="py-2 pl-0" @click="scrollToContact" :ref="id">
            <img :src="dummyImage" alt="icon" />
            <v-list-item :title="name" :subtitle="phone"></v-list-item>
        </v-expansion-panel-title>

        <!-- Выпадающая часть -->
        <v-expansion-panel-text>
            <!-- Информация -->
            <div class="d-flex flex-wrap justify-start py-2 with-gap">
                <template v-for="info in infoList" :key="info.data">
                    <CopiedButton
                        v-if="!!info.data"
                        :data="info.data"
                        :title="info.title"
                        :isCopied="copiedInfo === info.data"
                        @copied="copiedInfo = $event"
                    />
                </template>
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
                <v-btn @click="$emit('editContact', this.id)" icon variant="outlined" size="small" color="blue">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="$emit('deleteContact', this.id)" icon variant="outlined" size="small" color="red">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script>
export default {
    props: ['id', 'name', 'phone', 'email', 'birthday'],
    emits: ['editContact', 'deleteContact'],
    data() {
        return {
            editFormVisible: false,
            copiedInfo: null
        };
    },
    computed: {
        infoList() {
            return [
                { data: this.phone, title: this.$t('contacts.list.item.info.phone') },
                { data: this.email, title: this.$t('contacts.list.item.info.email') },
                { data: this.birthday, title: this.$t('contacts.list.item.info.birthday') }
            ];
        },
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
        scrollToContact() {
            const el = this.$refs[this.id].$el;
            el.scrollIntoView();
        }
    }
};
</script>

<style scoped>
img {
    margin-left: 16px;
    border-radius: 50%;
    height: 40px;
}
.with-gap {
    gap: 0.5rem;
}
</style>
