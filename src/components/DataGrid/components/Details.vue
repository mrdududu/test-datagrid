<script setup lang="ts">
import { onMounted } from 'vue'
import { useDetails } from '@/stores/use-fetch-details'
import { ElSkeleton } from 'element-plus'

interface DetailsProps {
  id: number
}

const props = defineProps<DetailsProps>()

const details = useDetails(props.id)

onMounted(() => {
  details.fetch()
})
</script>
<template lang="pug">
.flex(v-if="details.state.value === 'loading'") 
  el-skeleton(:rows="5" animated)
table(v-if="details.state.value === 'done'")
  tbody
    tr(v-for="k in Object.keys(details.data.value)" :key="k")
      td {{ k }}
      td {{ details.data.value[k] }}
div(v-if="details.state.value === 'error'") {{ details.errMsg.value }}
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
