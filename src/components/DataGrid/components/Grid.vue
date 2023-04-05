<script setup lang="ts">
import GridHeader from './GridHeader.vue'
import GridRow from './GridRow.vue'
import type { Column } from '../'

interface GridProps {
  columns: Column[]
  rows: any[]
}

const props = defineProps<GridProps>()

const emit = defineEmits<{
  (e: 'sortToggle', name: string): void
}>()
</script>

<template lang="pug">
table
  GridHeader(:columns="columns" @sortToggle="($event) => $emit('sortToggle', $event)")
  tbody
    GridRow(v-for="row in rows" :key="JSON.stringify(row)" :columns="columns" :row="row")
</template>
