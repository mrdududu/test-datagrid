<script setup lang="ts">
import { ElSelect } from 'element-plus'
import { ElOption } from 'element-plus'

interface PageSizeSelectorProps {
  itemsOnPage: number
  pageSizeOptions: number[]
}

const props = defineProps<PageSizeSelectorProps>()
const emit = defineEmits<{
  (e: 'change', itemsOnPage: number): void
}>()
</script>
<template lang="pug">
.flex.items-center
  .mr-2 Show 
  .w-24
    el-select(:modelValue="itemsOnPage" @update:modelValue="$emit('change', $event)")
      el-option(v-for="pSize in pageSizeOptions" :key="pSize" :value="pSize" :label="`${pSize}`")
  .ml-2 entries
</template>
