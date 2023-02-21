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
            <v-btn variant="outlined" color="blue" type="submit">
                <v-icon small class="mr-3">mdi-plus</v-icon>
                Create
            </v-btn>
        </template>
    </BaseDialog>
</template>

<!-- TODO: Composition API: validation in setup -> disabled button -->
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
        }
    },
    emits: ['close'],
    data() {
        return {
            // input data
            userName: '',
            userPhone: '',
            userMail: '',
            userBirthday: null,

            // input rules
            nameRules: [
                val => !!(val && val.trim()) || 'Name is required.',
                val => val?.length <= 40 || 'Name must be less than 40 characters.'
            ],
            phoneRules: [
                val => !!(val && val.trim()) || 'Phone number is required.',
                val => /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(val) || 'Phone must be valid.'
            ],
            emailRules: [val => !(val && val.trim()) || /.+@.+\..+/.test(val) || 'E-mail must be valid.'],
            birthdayRules: [
                val => val !== null || !isNaN(new Date(val).getTime()) || 'Date must be valid',
                val => {
                    const enteredDate = new Date(val);
                    const nowDate = new Date(new Date().toISOString().slice(0, 10));
                    const tooYoung = enteredDate.getTime() > nowDate.getTime();

                    return !tooYoung || 'The site rules prohibit saving users from the future :)';
                },
                val => {
                    const enteredDate = new Date(val);
                    const tooOld = enteredDate.getFullYear() < 1900;

                    return (
                        !tooOld ||
                        'We doubt that you will be able to reach such an old contact. Please, try someone younger :)'
                    );
                }
            ]
        };
    },
    methods: {
        // TODO: show success/failure message
        async createContact() {
            const formattedBirthday = this.userBirthday?.split('-').reverse().join('.') || null;
            const newContact = {
                name: this.userName,
                phone: this.userPhone,
                email: this.userMail,
                birthday: formattedBirthday
            };

            const { message, type } = await this.$store.dispatch('registerContact', newContact);
            this.$store.dispatch('snackbar/showSnackbar', { message, type });

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
