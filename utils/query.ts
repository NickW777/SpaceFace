import { SpaceProviderType, SpaceProvider, BlockMapType, BlockMap } from './ZodTypes'
import { useFetch } from '@vueuse/core'

//Query SpaceProvider
export async function fetchSpaceProvider(query: string, page: number, limit: number) {
  const url = `https://spaceprovider.up.railway.app/api/v1?q=${query}&page=${page}&limit=${limit}`;
  const { data, error } = useFetch(url).get().json();
  if (error.value) throw new Error('Failed to load data');
  return data.value;
}

//Query BlockMap
export async function fetchBlockMap(roomId: string | null): Promise<BlockMapType | null> {
  //Make sure we don't query a null string
  if (!roomId) roomId = ''
  const { data } = await useFetch<string>(
    `https://blockmap.onrender.com/room?roomId=${roomId}`
  ).get()
  // if (!data) throw new Error('No data found')
  return BlockMap.parse(JSON.parse(data.value ?? ''))
}
