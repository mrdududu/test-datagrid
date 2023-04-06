<script setup lang="ts">
import type { Column } from '../'

interface GridHeaderProps {
  columns: Column[]
  sort?: { column: string; direction: 'ASC' | 'DESC' }
}

const props = defineProps<GridHeaderProps>()

const emit = defineEmits<{
  (e: 'sortToggle', name: string): void
}>()

const showSort = (colName: string) => {
  if (props.sort?.column === colName) return props.sort.direction

  return null
}
</script>

<template lang="pug">
thead 
  tr
    th(v-for="column in columns" :key="column.name" @click="$emit('sortToggle', column.name)")
      .flex.items-center.justify-center
        .mx-2 {{ column.label }}
        .arrow-up(v-if="'ASC' === showSort(column.name)")
        .arrow-down(v-if="'DESC' === showSort(column.name)")
</template>

<style scoped>
th {
  @apply border border-slate-300 p-3 bg-slate-100 cursor-pointer;
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #000;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000;
}
</style>
