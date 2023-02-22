<template>
    <v-btn @click="copyToClipboard(data)" variant="tonal" title="Click to Copy to Clipboard">
        <strong>{{ title }}: </strong> {{ data }}
    </v-btn>
</template>

<script>
export default {
    props: ['title', 'data'],
    methods: {
        async copyToClipboard(mytext) {
            await navigator.clipboard.writeText(mytext);
        }
    }
};
</script>
