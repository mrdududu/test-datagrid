import { reactive, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { fetchItems } from '@/api'
import type { Album } from '@/api'

const defaultItemsOnPage = 10

type State = {
  data: Album[]
  currentPageIndex: number
  itemsOnPage: number
  sort: { column?: keyof Album; direction: 'ASC' | 'DESC' }
}

export const useDataGridStore = defineStore('data-grid', () => {
  const state = reactive<State>({
    data: [],
    currentPageIndex: 0,
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
    const start = state.currentPageIndex * state.itemsOnPage
    const end = start + state.itemsOnPage
    return sortedData.value.slice(start, end)
  })

  const totalPages = computed(() => Math.ceil(state.data.length / state.itemsOnPage) + 1)

  const fetchData = async () => {
    const dataItems = await fetchItems()
    if (dataItems) {
      state.currentPageIndex = 0
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

  const setCurrentPageIndex = (inx: number) => {
    if (0 > inx) throw new Error('Current page index must be 0 or more')
    if (inx >= totalPages.value) throw new Error('Current page index must be les then total pages')

    state.currentPageIndex = inx
  }

  return {
    state: readonly(state),
    getters: {
      currentPageData,
      totalPages
    },
    actions: {
      fetchData,
      toogleSorting,
      setCurrentPageIndex
    }
  }
})
