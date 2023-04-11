<script setup lang="ts">
import { onMounted } from 'vue'
import { useMachine } from '@xstate/vue'
import { fetchMachine } from '@/fsm/fetch-machine'
import { fetchItemDetail } from '@/api'
import { ElSkeleton } from 'element-plus'

interface DetailsProps {
  id: number
}

const props = defineProps<DetailsProps>()

// type ItemDetail = Awaited<ReturnType<typeof fetchItemDetail>>

const fetchDetailsMachine = fetchMachine(() => fetchItemDetail(props.id))
const { state, send } = useMachine(fetchDetailsMachine)

onMounted(() => {
  send('FETCH')
})
</script>
<template lang="pug">
.flex(v-if="state.matches('loading')") 
  el-skeleton(:rows="5" animated)
table(v-if="state.matches('success')")
  tbody
    tr(v-for="k in Object.keys(state.context.data)" :key="k")
      td {{ k }}
      td {{ state.context.data[k] }}
div(v-if="state.matches('failture')") {{ state.context.error}}
</template>
<style scoped>
table {
  @apply table-auto border-collapse;
}
tbody {
  @apply divide-y divide-gray-300;
}
td {
  @apply p-2;
}
</style>
