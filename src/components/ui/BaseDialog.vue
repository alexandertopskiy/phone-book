<template>
    <v-dialog v-model="showDialog" width="450">
        <v-card class="pa-4">
            <h1 class="text-h5 text-center">{{ title }}</h1>

            <!-- Form -->
            <v-form class="my-2" @submit.prevent="submitData" validate-on="blur" ref="form">
                <slot name="dataFields"></slot>

                <!-- Actions -->
                <div class="d-flex justify-space-between pt-4">
                    <!-- Cancel/Close Modal -->
                    <v-btn variant="outlined" color="red" @click="closeModal">
                        {{ $t('commonUI.dialog.closeBtn') }}
                    </v-btn>
                    <!-- Main Action -->
                    <slot name="mainAction"></slot>
                </div>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'BaseDialog',
    props: {
        dialog: {
            type: Boolean,
            default: false,
            required: true
        },
        title: {
            type: String,
            default: '',
            required: false
        }
    },
    emits: ['close', 'sumbitData'],
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
        async submitData() {
            const { valid } = await this.$refs.form.validate();
            if (!valid) return;

            this.$emit('sumbitData');
        }
    }
};
</script>
