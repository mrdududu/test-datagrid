<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/ui/Button.vue'
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
  Button(label="Previous" :disabled="pageIndex === 0" @click="$emit('setPage', pageIndex - 1)")
  Button(v-for="pIndex in pages" :label="`${pIndex + 1}`" :disabled="pIndex === pageIndex" @click="$emit('setPage', pIndex)")
  Button(label="Next"  :disabled="pageIndex === totalPages - 1" @click="$emit('setPage', pageIndex + 1)")
</template>
