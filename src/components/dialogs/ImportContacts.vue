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
            <v-btn variant="outlined" color="blue" type="submit" :disabled="!jsonData">
                <v-icon small class="mr-3">mdi-application-import</v-icon>
                Import
            </v-btn>
        </template>
    </BaseDialog>
</template>

<!-- TODO: Composition API: validation in setup -> disabled button -->
<!-- test data: -->
<!-- [{"name":"Alex Hoppesr","phone":"+7-352-456-78-90","email":"user21@mail.ru","birthday":"01.01.2000"}, -->
<!-- {"name":"user 1","phone":"+7-288-456-78-90","email":"user211@mail.ru","birthday":"01.01.2000"}, -->
<!-- {"name":"test user 2","phone":"+7-329-456-78-90","email":"user122@mail.ru","birthday":"01.01.2000"}, -->
<!-- {"name":"Username", "phone":"+7-532-456-78-90", "email":"user512@mail.ru", "birthday":"01.01.2000"}] -->
<script>
import BaseDialog from '@/components/dialogs/BaseDialog.vue';

export default {
    components: {
        BaseDialog
    },
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
        // TODO: show success/failure message
        async importContacts() {
            const { message, type } = await this.$store.dispatch('importContacts', JSON.parse(this.jsonData));
            this.$store.dispatch('snackbar/showSnackbar', { message, type });

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
