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

const SPACE_PROVIDER_URI = 'https://spaceprovider.up.railway.app/api/v1'

export async function fetchSpaceProvider(
  q: string,
  filterArr: string[],
  page: number
): Promise<SpaceProviderType> {
  console.log('fetching SpaceProvider')
  // Note from Will: Latitude and longitude isnt working smoothly for me, so its commented out
  // const position = await new Promise<GeolocationPosition>((resolve, reject) => {
  //   navigator.geolocation.getCurrentPosition(resolve, reject)
  // })
  // const lat = position.coords.latitude
  // const lon = position.coords.longitude
  // console.log(`Fetching SpaceProvider with query: ${q}`, `lat: ${lat}`, `lon: ${lon}, `, filterArr)

  // Parse filterArr into queryable string
  let filterQuery = ''
  filterArr.forEach((label) => (filterQuery += ' label:' + label))
  // console.log(`${SPACE_PROVIDER_URI}?q=${q}${filterQuery}&page=${page}&limit=10`)

  const { data } = await useFetch<string>(
    `${SPACE_PROVIDER_URI}?q=${q}${filterQuery}&page=${page}&limit=10`
  ).get()

  return SpaceProvider.parse(JSON.parse(data.value ?? ''))
}
