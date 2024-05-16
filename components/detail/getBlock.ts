import { BlockMapType } from '../../utils/ZodTypes'

const BLOCK_MAP_URI = 'https://blockmap.onrender.com/room?roomId='

export const getBlock = async (building: string, room: string) => {
  console.log("get block " + room)
  const rawResponse = await fetch(BLOCK_MAP_URI + building + '-' + room)
  const response = await rawResponse.json()
  return response as BlockMapType
}