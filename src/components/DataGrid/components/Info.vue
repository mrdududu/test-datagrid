<script setup lang="ts">
interface InfoProps {
  startEntry: number
  endEntry: number
  totalEntries: number
}

const props = defineProps<InfoProps>()
</script>
<template lang="pug">
div Showing {{startEntry}} to {{ endEntry }} of {{ totalEntries }} entries
</template>
