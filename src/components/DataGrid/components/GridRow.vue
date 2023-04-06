<script setup lang="ts">
import { reactive } from 'vue'
import { ElIcon, ElButton } from 'element-plus'
import { CirclePlusFilled, RemoveFilled } from '@element-plus/icons-vue'
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
  td.text-center
    el-button(:icon="state.isOpen ? RemoveFilled : CirclePlusFilled" circle text @click="handleRowClick")
  td(v-for="column in columns" :key="column.name") {{ row[column.name] }}
tr(v-if="state.isOpen")
  td(:colspan="columns.length + 1")
    Details(:id="row.id")
</template>

<style scoped>
td {
  @apply border border-slate-300 p-2;
}
</style>
