<template>
    <v-dialog v-model="showDialog" width="450">
        <v-card class="pa-4">
            <h1 class="text-h5 text-center">Import Contacts</h1>

            <!-- Form -->
            <v-form class="my-2" @submit.prevent="importContacts" validate-on="blur" ref="form">
                <!-- JSON Data Field -->
                <v-textarea
                    v-model.trim="jsonData"
                    :rules="jsonDataRules"
                    label="Paste JSON Data here, format:"
                    auto-grow
                    required
                    class="pb-2"
                ></v-textarea>

                <!-- Actions -->
                <div class="d-flex justify-space-between pt-4">
                    <!-- Cancel/Close Modal -->
                    <v-btn variant="outlined" color="red" @click="closeModal">
                        <v-icon small class="mr-3">mdi-backspace-outline</v-icon>
                        Cancel
                    </v-btn>
                    <!-- Import/Main Action -->
                    <v-btn variant="outlined" color="blue" type="submit" :disabled="!jsonData">
                        <v-icon small class="mr-3">mdi-application-import</v-icon>
                        Import
                    </v-btn>
                </div>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<!-- TODO: Composition API: validation in setup -> disabled button -->
<script>
// test data:
// [{"name":"Alex Hoppesr","phone":"+7-352-456-78-90","email":"user21@mail.ru","birthday":"01.01.2000"},
// {"name":"user 1","phone":"+7-288-456-78-90","email":"user211@mail.ru","birthday":"01.01.2000"},
// {"name":"test user 2","phone":"+7-329-456-78-90","email":"user122@mail.ru","birthday":"01.01.2000"},
// {"name":"Username", "phone":"+7-532-456-78-90", "email":"user512@mail.ru", "birthday":"01.01.2000"}]

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
                // isJSON?
            ]
        };
    },
    computed: {
        showDialog: {
            get() {
                return this.dialog;
            },
            set() {
                this.closeModal();
            }
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
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
            const { valid } = await this.$refs.form.validate();
            if (!valid) return;

            const result = await this.$store.dispatch('importContacts', JSON.parse(this.jsonData));
            console.log('импорт завершен, число недобавленых: ', result);
            this.closeModal();
        }
    }
};
</script>
