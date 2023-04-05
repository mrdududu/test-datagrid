<script setup lang="ts">
import { useDataGridStore } from '@/stores/data-grid'
import Grid from './components/Grid.vue'
import Paging from './components/Paging.vue'
import PageSizeSelector from './components/PageSizeSelector.vue'
import Search from './components/Search.vue'
import type { Column } from './'

const columns: Column[] = [
  { name: 'userId', label: 'userId', sortable: true },
  { name: 'id', label: 'id', sortable: true },
  { name: 'title', label: 'title', sortable: true }
]

const pageSizeOptions = [3, 10, 20, 23]

const store = useDataGridStore()
store.actions.fetchData()

const handleSortToggle = (nameColumn: string) => {
  console.log('handleSortToggle', nameColumn)
  store.actions.toogleSorting(nameColumn)
}

const handleSetPage = (pageIndex: number) => {
  console.log('handleSetPage', pageIndex)
  store.actions.setCurrentPageIndex(pageIndex)
}

const handelItemsOnPageChange = (itemsOnPage: number) => {
  console.log('handelItemsOnPageChange', itemsOnPage)
  store.actions.setItemsOnPage(itemsOnPage)
}

const handleSearchTextChange = (searchText: string) => {
  console.log('handleSearchTextChange', searchText)
  store.actions.setSearchText(searchText)
}
</script>
<template lang="pug">
div
  .flex.justify-between
    PageSizeSelector(:itemsOnPage="store.state.itemsOnPage" :pageSizeOptions="pageSizeOptions" @change="handelItemsOnPageChange")
    Search(:searchText="store.state.searchText" @change="handleSearchTextChange")
  Grid(:columns="columns" :rows="store.getters.currentPageData" @sortToggle="handleSortToggle")
  Paging(:pageIndex="store.state.currentPageIndex" :totalPages="store.getters.totalPages" @setPage="handleSetPage")
</template>
