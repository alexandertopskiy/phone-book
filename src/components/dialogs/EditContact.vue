<template>
    <BaseDialog :dialog="dialog" :title="$t('dialogs.edit.title')" @close="closeModal" @sumbitData="editContact">
        <template #dataFields>
            <!-- Name Field -->
            <v-text-field
                v-model.trim="userName"
                :rules="nameRules"
                :counter="40"
                :label="$t('dialogs.createAndEdit.inputs.name')"
                required
                class="pb-2"
            ></v-text-field>

            <!-- Phone Field -->
            <v-text-field
                type="tel"
                v-model.trim="userPhone"
                :rules="phoneRules"
                :label="$t('dialogs.createAndEdit.inputs.phone')"
                required
                class="pb-2"
            ></v-text-field>

            <!-- Email Field -->
            <v-text-field
                type="email"
                v-model.trim="userMail"
                :rules="emailRules"
                :label="$t('dialogs.createAndEdit.inputs.email')"
                class="pb-2"
            ></v-text-field>

            <!-- Birthday -->
            <v-text-field
                type="date"
                :max="new Date().toISOString().slice(0, 10)"
                min="1950-01-01"
                v-model="userBirthday"
                :rules="birthdayRules"
                :label="$t('dialogs.createAndEdit.inputs.birthday')"
                persistent-hint
                :hint="$t('dialogs.createAndEdit.inputs.birthdayTip')"
                class="pb-2"
            ></v-text-field>
        </template>

        <template #mainAction>
            <!-- Edit/Main Action -->
            <v-btn variant="outlined" color="blue" type="submit" :disabled="!hasChanges">
                <v-icon small class="mr-3">mdi-content-save-edit-outline</v-icon>
                {{ $t('dialogs.edit.btnTitle') }}
            </v-btn>
        </template>
    </BaseDialog>
</template>

<script>
import createEditMixin from '@/mixins/createEditMixin';

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
                this.closeModal();
            } catch (error) {
                this.$store.dispatch('snackbar/showSnackbar', { message: error.message, type: 'failure' });
            }
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
