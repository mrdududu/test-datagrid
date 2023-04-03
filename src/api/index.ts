import { api } from './common'

//https://jsonplaceholder.typicode.com/albums
//https://jsonplaceholder.typicode.com/photos
export interface Album {
  userId: number
  id: number
  title: string
}

export interface AlbumDetail {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export const fetchItems = async () => {
  try {
    const res = await api.get<Album[]>('/albums')
    // console.log(res.data)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const fetchItemDetail = async (id: number) => {
  try {
    const res = await api.get<AlbumDetail[]>('/photos')
    if (Array.isArray(res.data)) {
      return res.data.find((item) => item.id === id)
    }
  } catch (err) {
    console.error(err)
  }
}
