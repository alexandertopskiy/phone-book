<template>
    <BaseDialog :dialog="dialog" :title="$t('dialogs.delete.title')" @close="closeModal" @sumbitData="deleteContact">
        <template #dataFields>
            <p class="text-subtitle-1 text-center">{{ $t('dialogs.delete.subtitle') }}</p>
        </template>
        <template #mainAction>
            <!-- Create/Main Action -->
            <v-btn variant="outlined" color="blue" type="submit">
                <v-icon small class="mr-3">mdi-plus</v-icon>
                {{ $t('dialogs.delete.btnTitle') }}
            </v-btn>
        </template>
    </BaseDialog>
</template>

<script>
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
    methods: {
        async deleteContact() {
            try {
                const message = await this.$store.dispatch('contacts/removeContact', { id: this.id });
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
