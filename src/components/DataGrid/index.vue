<script setup lang="ts">
import { useDataGridStore } from '@/stores/data-grid'
import Grid from './components/Grid.vue'
import type { Column } from './'

const columns: Column[] = [
  { name: 'userId', label: 'userId', sortable: true },
  { name: 'id', label: 'id', sortable: true },
  { name: 'title', label: 'title', sortable: true }
]

const store = useDataGridStore()
store.actions.fetchData()

const handleSortToggle = (nameColumn: string) => {
  console.log('handleSortToggle', nameColumn)
  store.actions.toogleSorting(nameColumn)
}
</script>
<template lang="pug">
Grid(:columns="columns" :rows="store.getters.currentPageData" @sortToggle="handleSortToggle")
</template>
