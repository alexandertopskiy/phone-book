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
                value => {
                    if (value && value.trim()) return true;
                    return 'Name is required.';
                },
                value => {
                    if (value?.length <= 40) return true;
                    return 'Name must be less than 40 characters.';
                }
            ],
            phoneRules: [
                value => {
                    if (value && value.trim()) return true;
                    return 'Phone number is required.';
                },
                value => {
                    if (/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value)) return true;
                    return 'Phone must be valid.';
                }
            ],
            // TODO: not required
            emailRules: [
                value => {
                    if (value && value.trim()) return true;
                    return 'E-mail is required.';
                },
                value => {
                    if (/.+@.+\..+/.test(value)) return true;
                    return 'E-mail must be valid.';
                }
            ],
            // TODO: not required
            birthdayRules: [
                // TODO: add validation
                value => {
                    if (value && value.trim()) return true;
                    return 'E-mail is required.';
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
        createContact() {
            if (!this.isFormValid) return;

            const formattedBirthday = this.userBirthday?.split('-').reverse().join('.') || null;
            const newContact = {
                name: this.userName,
                phone: this.userPhone,
                email: this.userMail,
                birthday: formattedBirthday
            };

            // TODO: save to store -> closeModal
            console.log('createContact: ', newContact);
            this.closeModal();
        }
    }
};
</script>
