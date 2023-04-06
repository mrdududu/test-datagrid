<script setup lang="ts">
import { computed } from 'vue'
import { ElButton } from 'element-plus'
interface PagingProps {
  pageIndex: number
  totalPages: number
}

const props = defineProps<PagingProps>()
const emit = defineEmits<{
  (e: 'setPage', pageIndex: number): void
}>()

const pages = computed(() => Array.from(Array(props.totalPages), (_, x) => x))
</script>
<template lang="pug">
div
  el-button(:disabled="pageIndex === 0" @click="$emit('setPage', pageIndex - 1)") Previous
  el-button(v-for="pIndex in pages" :disabled="pIndex === pageIndex" @click="$emit('setPage', pIndex)") {{ pIndex + 1 }}
  el-button(:disabled="pageIndex === totalPages - 1" @click="$emit('setPage', pageIndex + 1)") Next
</template>
