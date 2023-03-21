<template>
    <BaseDialog :dialog="dialog" :title="titleCapture" @close="closeModal" @sumbitData="deleteContact">
        <template #dataFields>
            <p class="text-subtitle-1 text-center" v-html="subtitleCapture"></p>
        </template>

        <template #mainAction>
            <!-- Create/Main Action -->
            <v-btn variant="outlined" color="blue" type="submit">
                <v-icon small class="mr-3">mdi-delete-outline</v-icon>
                {{ buttonCapture }}
            </v-btn>
        </template>
    </BaseDialog>
</template>

<script lang="ts">
export default {
    props: {
        dialog: {
            type: Boolean,
            default: false,
            required: true
        },
        id: {
            type: String
        }
    },
    emits: ['close'],
    computed: {
        titleCapture() {
            return this.id ? this.$t('dialogs.delete.one.title') : this.$t('dialogs.delete.all.title');
        },
        subtitleCapture() {
            return this.id ? this.$t('dialogs.delete.one.subtitle') : this.$t('dialogs.delete.all.subtitle');
        },
        buttonCapture() {
            return this.id ? this.$t('dialogs.delete.one.btnTitle') : this.$t('dialogs.delete.all.btnTitle');
        }
    },
    methods: {
        async deleteContact() {
            try {
                let message: string;
                if (this.id) message = await this.$store.dispatch('contacts/removeContact', { id: this.id });
                else message = await this.$store.dispatch('contacts/removeAllContacts');

                this.$store.dispatch('snackbar/showSnackbar', { message, type: 'success' });
                this.closeModal();
            } catch (error) {
                this.$store.dispatch('snackbar/showSnackbar', { message: error.message, type: 'failure' });
            }
        },
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>
