import { reactive, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { fetchItems } from '@/api'
import type { Album } from '@/api'

type SortDirection = 'ASC' | 'DESC'

type State = {
  data: Album[]
  currentPageIndex: number
  itemsOnPage: number
  sort: { column?: keyof Album; direction: SortDirection }
  searchText: string
}

const defaultState: State = {
  data: [],
  currentPageIndex: 0,
  itemsOnPage: 10,
  sort: { direction: 'ASC' },
  searchText: ''
}

export const useDataGridStore = defineStore('data-grid', () => {
  const state = reactive<State>(defaultState)

  const filteredData = computed(() => {
    const data = state.data
    if (!state.searchText) return data

    return data.filter((item: any) =>
      Object.keys(item).some((k) => {
        const val = item[k]
        if (!val) return false

        return val.toString().toLowerCase().includes(state.searchText.toLowerCase())
      })
    )
  })

  const sortedData = computed(() => {
    const data = filteredData.value

    if (undefined === state.sort.column || 0 === data.length) return data
    else {
      const firstVal = data[0][state.sort.column]

      if (firstVal) {
        switch (typeof firstVal) {
          case 'number':
            return data.sort((a, b) => {
              const valA = a[state.sort.column as keyof Album] as number
              const valB = b[state.sort.column as keyof Album] as number
              const res = valA - valB

              return state.sort.direction === 'ASC' ? res : -res
            })
          default:
            return data.sort((a, b) => {
              const valA = a[state.sort.column as keyof Album].toString()
              const valB = b[state.sort.column as keyof Album].toString()
              const res = valA.localeCompare(valB)

              return state.sort.direction === 'ASC' ? res : -res
            })
        }
      }

      return data
    }
  })

  const currentPageData = computed(() => {
    const start = state.currentPageIndex * state.itemsOnPage
    const end = start + state.itemsOnPage
    return sortedData.value.slice(start, end)
  })

  const totalPages = computed(() => Math.ceil(filteredData.value.length / state.itemsOnPage))

  const info = computed(() => ({
    startEntry: state.currentPageIndex * state.itemsOnPage + 1,
    endEntry: state.currentPageIndex * state.itemsOnPage + currentPageData.value.length,
    totalEntries: sortedData.value.length
  }))

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

  const setItemsOnPage = (itemsOnPage: number) => {
    if (1 > itemsOnPage) throw new Error('Items on page must be more than 0')
    state.itemsOnPage = itemsOnPage
  }

  const setSearchText = (searchText: string) => {
    state.searchText = searchText
    state.currentPageIndex = 0
  }

  return {
    state: readonly(state),
    getters: {
      currentPageData,
      totalPages,
      info
    },
    actions: {
      fetchData,
      toogleSorting,
      setCurrentPageIndex,
      setItemsOnPage,
      setSearchText
    }
  }
})
