<template>
    <v-btn @click="copyToClipboard(data)" variant="tonal">
        <strong class="mr-1">{{ title }}: </strong> {{ data }}
        <v-tooltip activator="parent" v-model="show" location="bottom">
            {{ tooltipCapture }}
        </v-tooltip>
    </v-btn>
</template>

<script>
export default {
    name: 'CopiedButton',
    props: ['title', 'data', 'isCopied'],
    emits: ['copied'],
    data() {
        return {
            show: false
        };
    },
    methods: {
        async copyToClipboard(mytext) {
            if (this.isTouch) this.show = true;
            await navigator.clipboard.writeText(mytext);
            this.$emit('copied', this.data);
            setTimeout(() => (this.show = false), 2000);
        }
    },
    computed: {
        isTouch() {
            return this.$vuetify.display.platform.touch;
        },
        tooltipCapture() {
            return this.isTouch || this.isCopied
                ? this.$t('commonUI.copiedButton.doneTitle')
                : this.$t('commonUI.copiedButton.toDoTitle');
        }
    }
};
</script>
