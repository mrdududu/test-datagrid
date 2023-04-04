<script setup lang="ts">
import type { Column } from '../'

interface GridRowProps {
  columns: Column[]
  row: unknown
}

const props = defineProps<GridRowProps>()
</script>
<template lang="pug">
tr
  td(v-for="column in columns" :key="column.name") {{ row[column.name] }}
</template>
