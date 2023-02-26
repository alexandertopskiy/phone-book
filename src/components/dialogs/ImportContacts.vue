<template>
    <BaseDialog :dialog="dialog" title="Import Contacts" @close="closeModal" @sumbitData="importContacts">
        <template #dataFields>
            <!-- JSON Data Field -->
            <v-textarea
                v-model.trim="jsonData"
                :rules="jsonDataRules"
                label="Paste JSON Data here, format:"
                auto-grow
                required
                class="pb-2"
            ></v-textarea>
        </template>

        <template #mainAction>
            <!-- Import/Main Action -->
            <v-btn variant="outlined" color="blue" type="submit" :disabled="!hasEnteredData">
                <v-icon small class="mr-3">mdi-application-import</v-icon>
                Import
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
                val => !!(val && val.trim()) || 'JSON Data is required.',
                val => this.isValidJSON(val) || 'Data is invalid.'
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
        isValidJSON(value) {
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
