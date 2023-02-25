<template>
    <BaseDialog :dialog="dialog" title="Edit Contact" @close="closeModal" @sumbitData="editContact">
        <template #dataFields>
            <!-- Name Field -->
            <v-text-field
                v-model.trim="userName"
                :rules="nameRules"
                :counter="40"
                label="Name"
                required
                class="pb-2"
            ></v-text-field>

            <!-- Phone Field -->
            <v-text-field
                type="tel"
                v-model.trim="userPhone"
                :rules="phoneRules"
                label="Phone Number"
                required
                class="pb-2"
            ></v-text-field>

            <!-- Email Field -->
            <v-text-field
                type="email"
                v-model.trim="userMail"
                :rules="emailRules"
                label="E-mail"
                class="pb-2"
            ></v-text-field>

            <!-- Birthday -->
            <v-text-field
                type="date"
                :max="new Date().toISOString().slice(0, 10)"
                min="1950-01-01"
                v-model.trim="userBirthday"
                :rules="birthdayRules"
                label="Birthday"
                class="pb-2"
            ></v-text-field>
        </template>

        <template #mainAction>
            <!-- Edit/Main Action -->
            <v-btn variant="outlined" color="blue" type="submit" :disabled="!hasChanges">
                <v-icon small class="mr-3">mdi-content-save-edit-outline</v-icon>
                Save Changes
            </v-btn>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/dialogs/BaseDialog.vue';
import createEditMixin from '@/mixins/createEditMixin.js';

export default {
    components: { BaseDialog },
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
    mixins: [createEditMixin],
    data() {
        return {
            originalData: null
        };
    },
    computed: {
        hasChanges() {
            const formattedBirthday = this.userBirthday?.split('-').reverse().join('.') || null;
            const originalData = this.originalData;

            return (
                originalData.name !== this.userName ||
                originalData.phone !== this.userPhone ||
                originalData.email !== this.userMail ||
                originalData.birthday !== formattedBirthday
            );
        }
    },
    methods: {
        async editContact() {
            const formattedBirthday = this.userBirthday?.split('-').reverse().join('.') || null;
            const updatedContact = {
                id: this.id,
                name: this.userName,
                phone: this.userPhone,
                email: this.userMail,
                birthday: formattedBirthday
            };

            try {
                const message = await this.$store.dispatch('contacts/updateContact', updatedContact);
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
            const editedContact = this.$store.getters['contacts/contacts'].find(contact => contact.id === this.id);
            const formattedBirthday = editedContact.birthday?.split('.').reverse().join('-') || null;

            this.userName = editedContact.name;
            this.userPhone = editedContact.phone;
            this.userMail = editedContact.email;
            this.userBirthday = formattedBirthday;

            this.originalData = editedContact;
        }
    },
    created() {
        this.setOriginalData();
    }
};
</script>
