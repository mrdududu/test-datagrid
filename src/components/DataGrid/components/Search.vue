<script setup lang="ts">
import { ElInput } from 'element-plus'

interface SearchProps {
  searchText: string
}

const props = defineProps<SearchProps>()
const emit = defineEmits<{
  (e: 'change', searchText: string): void
}>()
</script>
<template lang="pug">
.flex.items-center
  .mr-2 Search:
  .w-40
    el-input(:modelValue="searchText" @update:modelValue="$emit('change', $event)")
</template>
