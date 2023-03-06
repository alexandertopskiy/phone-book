<template>
    <BaseDialog :dialog="dialog" :title="$t('dialogs.create.title')" @close="closeModal" @sumbitData="createContact">
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
                :hint="isTouch ? null : $t('dialogs.createAndEdit.inputs.birthdayTip')"
                class="pb-2"
            >
            </v-text-field>
        </template>

        <template #mainAction>
            <!-- Create/Main Action -->
            <v-btn variant="outlined" color="blue" type="submit" :disabled="!hasEnteredData">
                <v-icon small class="mr-3">mdi-plus</v-icon>
                {{ $t('dialogs.create.btnTitle') }}
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
    inject: ['isTouch'],
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
            this.userName = '';
            this.userPhone = '';
            this.userMail = '';
            this.userBirthday = null;
        }
    }
};
</script>
