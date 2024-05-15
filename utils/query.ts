import { resolve } from 'path'
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

export async function fetchSpaceProvider(q: string, filterArr:string[], page: number): Promise<SpaceProviderType> {

  // Note from Will: Latitude and longitude isnt working smoothly for me, so its commented out
  // const position = await new Promise<GeolocationPosition>((resolve, reject) => {
  //   navigator.geolocation.getCurrentPosition(resolve, reject)
  // })
  // const lat = position.coords.latitude
  // const lon = position.coords.longitude
  // console.log(`Fetching SpaceProvider with query: ${q}`, `lat: ${lat}`, `lon: ${lon}, `, filterArr)

  console.log("fetching SpaceProvider")

  // Parse filterArr into queryable string
  let filterQuery = "";
  filterArr.forEach(label => filterQuery += " label:" + label)

  const { data } = await useFetch<string>(
    `https://spaceprovider.up.railway.app/api/v1?q=${q}${filterQuery}&page=${page}&limit=10`
  ).get()

  return SpaceProvider.parse(JSON.parse(data.value ?? ''))
}

export async function fetchCompleteSpaceProvider(id: string): Promise<RoomType> {
  console.log(`Fetching complete SpaceProvider with id: ${id}`)

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
