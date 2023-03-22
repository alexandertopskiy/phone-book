<template>
    <BaseDialog :dialog="dialog" :title="$t('dialogs.import.title')" @close="closeModal" @sumbitData="importContacts">
        <template #dataFields>
            <!-- JSON Data Field -->
            <v-textarea
                v-model.trim="jsonData"
                :rules="jsonDataRules"
                :label="$t('dialogs.import.inputTitle')"
                auto-grow
                required
                persistent-hint
                :hint="$t('dialogs.import.hint')"
                class="pb-2"
            ></v-textarea>
        </template>

        <template #mainAction>
            <!-- Import/Main Action -->
            <v-btn variant="outlined" color="blue" type="submit" :disabled="!hasEnteredData">
                <v-icon small class="mr-3">mdi-application-import</v-icon>
                {{ $t('dialogs.import.btnTitle') }}
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
        }
    },
    emits: ['close'],
    data() {
        return {
            // input data
            jsonData:
                '[{"name":"Username", "phone":"+7-123-456-78-90", "email":"user1@mail.ru", "birthday":"01.01.2000"}]',

            // input rules
            jsonDataRules: [
                (val: string) => !!(val && val.trim()) || this.$t('dialogs.import.errors.required'),
                (val: string) => this.isValidJSON(val) || this.$t('dialogs.import.errors.invalid')
            ]
        };
    },
    computed: {
        hasEnteredData() {
            return !!this.jsonData;
        }
    },
    methods: {
        // TODO: check validation
        isValidJSON(value: string) {
            try {
                const o = JSON.parse(value);
                return !!o && typeof o === 'object';
            } catch {
                return false;
            }
        },
        async importContacts() {
            try {
                const message = await this.$store.dispatch('contacts/importContacts', JSON.parse(this.jsonData));
                this.$store.dispatch('snackbar/showSnackbar', { message, type: 'success' });
            } catch (error) {
                this.$store.dispatch('snackbar/showSnackbar', { message: error.message, type: 'failure' });
            }
            this.closeModal();
        },
        closeModal() {
            this.setOriginalData();
            this.$emit('close');
        },
        setOriginalData() {
            this.jsonData =
                '[{"name":"Username", "phone":"+7-123-456-78-90", "email":"user1@mail.ru", "birthday":"01.01.2000"}]';
        }
    }
};
</script>
