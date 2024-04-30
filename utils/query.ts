import {
  Room,
  RoomType,
  SpaceProviderType,
  SpaceProvider,
  BlockMapType,
  BlockMap
} from './ZodTypes'
import { useFetch } from '@vueuse/core'

//Query SpaceProvider
export async function fetchSpaceProvider(q: string): Promise<SpaceProviderType> {
  console.log(`Fetching SpaceProvider with query: ${q}`)

  const { data } = await useFetch<string>(
    `https://spaceprovider.up.railway.app/api/v1?q=${q}&page=1&limit=10`
  ).get()

  return SpaceProvider.parse(JSON.parse(data.value ?? ''))
}

export async function fetchCompleteSpaceProvider(id: string): Promise<RoomType> {
  console.log(`Fetching compelete SpaceProvider with id: ${id}`)

  const { data } = await useFetch<string>(
    `https://spaceprovider.up.railway.app/api/v1?_id=${id}`
  ).get()

  return Room.parse(JSON.parse(data.value ?? ''))
}

//Query BlockMap
export async function fetchBlockMap(roomId: string): Promise<BlockMapType> {
  console.log(`Fetching BlockMap with roomId: ${roomId}`)

  const { data } = await useFetch<string>(
    `https://blockmap.onrender.com/room?roomId=${roomId}`
  ).get()

  return BlockMap.parse(JSON.parse(data.value ?? ''))
}
