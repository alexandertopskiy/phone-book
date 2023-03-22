<template>
    <button @click="copyToClipboard(data)" v-ripple class="btn">
        <strong class="mr-1 text-uppercase">{{ title }}: </strong> {{ data }}
        <v-tooltip activator="parent" v-model="show" location="bottom">
            {{ tooltipCapture }}
        </v-tooltip>
    </button>
</template>

<script lang="ts">
export default { name: 'CopiedButton' };
</script>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps(['title', 'data', 'isCopied']);
const emit = defineEmits(['copied']);

const show = ref(false);
const isTouch = inject('isTouch');

// копирование данных в буфер обмена
const copyToClipboard = async function (copiedText: string) {
    if (isTouch) show.value = true;
    await navigator.clipboard.writeText(copiedText);
    emit('copied', props.data);
    // скрытие подсказки через 2с
    setTimeout(() => (this.show = false), 2000);
};

const tooltipCapture = computed(() =>
    isTouch || props.isCopied ? t('commonUI.copiedButton.doneTitle') : t('commonUI.copiedButton.toDoTitle')
);
</script>

<style scoped>
.btn {
    padding: 0 16px;

    background: rgba(0, 0, 0, 0.12);
    border-radius: 4px;

    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.025rem;
    line-height: 2.5rem;

    /* сокращение длинного текста (abcdef -> abc...) */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
