import { ref } from 'vue'
import { fetchItemDetail } from '@/api'
import type { AlbumDetail } from '@/api'

type State = null | 'loading' | 'error' | 'done'

export const useDetails = (idDetail: number) => {
  const data = ref<AlbumDetail>()
  const errMsg = ref<string>('')
  const state = ref<State>(null)

  const fetch = async () => {
    try {
      state.value = 'loading'
      errMsg.value = ''
      data.value = await fetchItemDetail(idDetail)
      state.value = 'done'
    } catch (err: any) {
      state.value = 'error'
      errMsg.value = err.message ? err.message : 'Network error'
    }
  }

  return { data, state, errMsg, fetch }
}
