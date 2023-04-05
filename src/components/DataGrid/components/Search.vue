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
.flex
  div Search:
  div
    el-input(:modelValue="searchText" @update:modelValue="$emit('change', $event)")
</template>
