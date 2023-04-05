<script setup lang="ts">
import { reactive } from 'vue'
import Details from './Details.vue'
import type { Column } from '../'

interface GridRowProps {
  columns: Column[]
  row: any
}

interface GridRowState {
  isOpen: boolean
}

const state = reactive<GridRowState>({ isOpen: false })

const props = defineProps<GridRowProps>()

const handleRowClick = () => {
  state.isOpen = !state.isOpen
}
</script>
<template lang="pug">
tr
  td(v-for="column in columns" :key="column.name" @click="handleRowClick") {{ row[column.name] }}
tr(v-if="state.isOpen")
  td(:colspan="columns.length")
    Details(:id="row.id")
</template>
