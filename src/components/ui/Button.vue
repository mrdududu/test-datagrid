<script setup lang="ts">
import { ElButton } from 'element-plus'
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
  <el-button :disabled="disabled" @click="$emit('click')">
    <template v-if="label">{{ label }}</template>
    <slot v-else></slot>
  </el-button>
</template>
