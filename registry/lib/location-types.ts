type DvAtoll = {
  id: string
  code?: string
  nameDv: string
  nameEn: string
}

type DvIsland = {
  id: string
  atollId: string
  nameDv: string
  nameEn: string
  latitude?: number
  longitude?: number
}

type DvCoordinates = {
  latitude: number
  longitude: number
}

type DvLocationValue = {
  atollId?: string
  islandId?: string
  latitude?: number
  longitude?: number
}

export type { DvAtoll, DvCoordinates, DvIsland, DvLocationValue }
