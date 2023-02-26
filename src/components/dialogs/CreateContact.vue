<template>
    <BaseDialog :dialog="dialog" title="New Contact" @close="closeModal" @sumbitData="createContact">
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
            <!-- Create/Main Action -->
            <v-btn variant="outlined" color="blue" type="submit" :disabled="!hasEnteredData">
                <v-icon small class="mr-3">mdi-plus</v-icon>
                Create
            </v-btn>
        </template>
    </BaseDialog>
</template>

<script>
import createEditMixin from '@/mixins/createEditMixin.js';

export default {
    props: {
        dialog: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    emits: ['close'],
    mixins: [createEditMixin],
    computed: {
        hasEnteredData() {
            return this.userName !== '' || this.userPhone !== '' || this.userMail !== '' || this.userBirthday !== null;
        }
    },
    methods: {
        async createContact() {
            const formattedBirthday = this.userBirthday?.split('-').reverse().join('.') || null;
            const newContact = {
                name: this.userName,
                phone: this.userPhone,
                email: this.userMail,
                birthday: formattedBirthday
            };

            try {
                const message = await this.$store.dispatch('contacts/registerContact', newContact);
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
            this.userName = '';
            this.userPhone = '';
            this.userMail = '';
            this.userBirthday = null;
        }
    }
};
</script>
