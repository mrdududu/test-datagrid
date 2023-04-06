<script setup lang="ts">
import { useDetails } from '@/stores/use-fetch-details'

interface DetailsProps {
  id: number
}

const props = defineProps<DetailsProps>()

const details = useDetails(props.id)
details.fetch()
</script>
<template lang="pug">
table(v-if="details.data.value")
  tbody
    tr(v-for="k in Object.keys(details.data.value)" :key="k")
      td {{ k }}
      td {{ details.data.value[k] }}
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
