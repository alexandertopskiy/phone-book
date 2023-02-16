<template>
    <v-dialog v-model="showDialog" width="450">
        <v-card class="pa-4">
            <h1 class="text-h5 text-center">New Contact</h1>

            <!-- Form -->
            <v-form v-model="isFormValid" class="my-2" @submit.prevent="createContact">
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

                <!-- Actions -->
                <div class="d-flex justify-space-between pt-4">
                    <!-- Cancel/Close Modal -->
                    <v-btn variant="outlined" color="red" @click="closeModal">
                        <v-icon small class="mr-3">mdi-backspace-outline</v-icon>
                        Cancel
                    </v-btn>
                    <!-- Create/Main Action -->
                    <v-btn variant="outlined" color="blue" type="submit">
                        <v-icon small class="mr-3">mdi-plus</v-icon>
                        Create
                    </v-btn>
                </div>
            </v-form>
        </v-card>
    </v-dialog>
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
            isFormValid: false,

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
                val => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(val) || 'Phone must be valid.'
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
            this.userName = '';
            this.userPhone = '';
            this.userMail = '';
            this.userBirthday = null;

            this.$emit('close');
        },
        // TODO: show success/failure message
        createContact() {
            if (!this.isFormValid) return;

            const formattedBirthday = this.userBirthday?.split('-').reverse().join('.') || null;
            const newContact = {
                name: this.userName,
                phone: this.userPhone,
                email: this.userMail,
                birthday: formattedBirthday
            };

            this.$store.dispatch('registerContact', newContact);
            this.closeModal();
        }
    }
};
</script>
