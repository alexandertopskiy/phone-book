<template>
    <v-btn @click="copyToClipboard(data)" variant="tonal">
        <strong class="mr-1">{{ title }}: </strong> {{ data }}
        <v-tooltip activator="parent" v-model="show" location="bottom">
            {{ tooltipCapture }}
        </v-tooltip>
    </v-btn>
</template>

<script>
export default { name: 'CopiedButton' };
</script>

<script setup>
import { ref, inject, computed, defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps(['title', 'data', 'isCopied']);
const emit = defineEmits(['copied']);

const show = ref(false);
const isTouch = inject('isTouch');

// копирование данных в буфер обмена
const copyToClipboard = async function (copiedText) {
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
