import { z } from 'zod'
import { LABEL_DISPLAY, Label } from './labels'

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
  //   lat: z.number(),
  //   lon: z.number()
})

const Rooms = z.object({
  gps_coords: Gps_Coords,
  _id: z.string(),
  building: z.string(),
  room: z.string(),
  access_notes: z.string(),
  images: z.array(z.string()),
  labels: z.array(z.custom<Label>()),
  capacity: z.number(),
  last_edited: z.string().datetime(),
  __v: z.number()
})

export const SpaceProvider = z.object({
  page: Page,
  options: Options,
  rooms: z.array(Rooms)
})

export type SpaceProviderType = z.infer<typeof SpaceProvider>
