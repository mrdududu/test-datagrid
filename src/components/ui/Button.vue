<script setup lang="ts">
interface ButtonProps {
  label?: string
  disabled: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), { disabled: false })
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
<template>
  <button class="btn btn-sm btn-outline" :disabled="disabled" @click="$emit('click')">
    <template v-if="label">{{ label }}</template>
    <slot v-else></slot>
  </button>
</template>
