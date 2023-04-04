<script setup lang="ts">
import type { Column } from '../'

interface GridHeaderProps {
  columns: Column[]
}

const props = defineProps<GridHeaderProps>()

const emit = defineEmits<{
  (e: 'sortToggle', name: string): void
}>()
</script>

<template lang="pug">
thead 
  tr
    th(v-for="column in columns" :key="column.name" @click="$emit('sortToggle', column.name)") {{ column.label }}
</template>
