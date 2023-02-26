<template>
    <v-btn @click="copyToClipboard(data)" variant="tonal">
        <strong class="mr-1">{{ title }}: </strong> {{ data }}
        <v-tooltip activator="parent" location="bottom">Click to Copy to Clipboard</v-tooltip>
    </v-btn>
</template>

<script>
export default {
    name: 'CopiedButton',
    props: ['title', 'data'],
    methods: {
        async copyToClipboard(mytext) {
            await navigator.clipboard.writeText(mytext);
        }
    }
};
</script>
