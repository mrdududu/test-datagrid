import { ref } from 'vue'
import { fetchItemDetail } from '@/api'
import type { AlbumDetail } from '@/api'

export const useDetails = (idDetail: number) => {
  const data = ref<AlbumDetail>()

  const fetch = async () => {
    data.value = await fetchItemDetail(idDetail)
  }

  return { data, fetch }
}
