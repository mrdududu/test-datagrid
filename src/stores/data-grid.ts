import { reactive, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { fetchItems } from '@/api'
import type { Album } from '@/api'

const defaultItemsOnPage = 10

type State = { data: Album[]; currentPage: number; itemsOnPage: number }

export const useCounterStore = defineStore('data-grid', () => {
  const state = reactive<State>({ data: [], currentPage: 0, itemsOnPage: defaultItemsOnPage })

  const currentPageData = computed(() => {
    const start = state.currentPage * state.itemsOnPage
    const end = start + state.itemsOnPage
    return state.data.slice(start, end)
  })

  const fetchData = async () => {
    const dataItems = await fetchItems()
    if (dataItems) {
      state.currentPage = 0
      state.data = dataItems
    }
  }

  return {
    state: readonly(state),
    getters: {
      currentPageData
    },
    actions: {
      fetchData
    }
  }
})
