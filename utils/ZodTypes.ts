import { z } from 'zod'
import { Label } from './labels'

//BlockMap
const Time = z.tuple([z.number(), z.number()])

const Blocks = z.object({
  Mon: z.array(Time),
  Tue: z.array(Time),
  Wed: z.array(Time),
  Thu: z.array(Time),
  Fri: z.array(Time),
  Sat: z.array(Time),
  Sun: z.array(Time)
})

export const BlockMap = z.object({
  building_code: z.string(),
  room_code: z.string(),
  Blocks: Blocks
})

export type BlockMapType = z.infer<typeof BlockMap>

//SpaceProvider
const Page = z.object({
  limit: z.number(),
  page: z.number(),
  page_results: z.number(),
  total_results: z.number(),
  total_pages: z.number(),
  last_page: z.boolean()
})

const Options = z.object({
  query: z.string()
})

const Gps_Coords = z.object({
  type: z.string(),
  coordinates: z.tuple([z.number(), z.number()])
})

export const Room = z.object({
  gps_coords: Gps_Coords,
  _id: z.string(),
  building: z.string(),
  room: z.string(),
  access_notes: z.string(),
  images: z.array(z.string()),
  thumbnail: z.string(),
  labels: z.array(z.custom<Label>()),
  capacity: z.number(),
  last_edited: z.string().datetime(),
  __v: z.number(),
  availability: z.custom<BlockMapType>()
})
export type RoomType = z.infer<typeof Room>

export const SpaceProvider = z.object({
  page: Page,
  options: Options,
  rooms: z.array(Room)
})
export type SpaceProviderType = z.infer<typeof SpaceProvider>
