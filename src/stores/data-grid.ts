import { reactive, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { fetchItems } from '@/api'
import type { Album } from '@/api'

const defaultItemsOnPage = 10

type State = {
  data: Album[]
  currentPage: number
  itemsOnPage: number
  sort: { column?: keyof Album; direction: 'ASC' | 'DESC' }
}

export const useDataGridStore = defineStore('data-grid', () => {
  const state = reactive<State>({
    data: [],
    currentPage: 0,
    itemsOnPage: defaultItemsOnPage,
    sort: { direction: 'ASC' }
  })

  const sortedData = computed(() => {
    if (undefined === state.sort.column || 0 === state.data.length) return state.data
    else {
      const firstVal = state.data[0][state.sort.column]

      if (firstVal) {
        switch (typeof firstVal) {
          case 'number':
            return state.data.sort((a, b) => {
              const valA = a[state.sort.column as keyof Album] as number
              const valB = b[state.sort.column as keyof Album] as number
              const res = valA - valB

              return state.sort.direction === 'ASC' ? res : -res
            })
          default:
            return state.data.sort((a, b) => {
              const valA = a[state.sort.column as keyof Album].toString()
              const valB = b[state.sort.column as keyof Album].toString()
              const res = valA.localeCompare(valB)

              return state.sort.direction === 'ASC' ? res : -res
            })
        }
      }

      return state.data
    }
  })

  const currentPageData = computed(() => {
    const start = state.currentPage * state.itemsOnPage
    const end = start + state.itemsOnPage
    return sortedData.value.slice(start, end)
  })

  const fetchData = async () => {
    const dataItems = await fetchItems()
    if (dataItems) {
      state.currentPage = 0
      state.data = dataItems
    }
  }

  const toogleSorting = (column: string) => {
    if (state.sort.column === column) {
      state.sort.direction = state.sort.direction === 'ASC' ? 'DESC' : 'ASC'
    } else {
      state.sort.column = column as keyof Album
    }
  }

  return {
    state: readonly(state),
    getters: {
      currentPageData
    },
    actions: {
      fetchData,
      toogleSorting
    }
  }
})
