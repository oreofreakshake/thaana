interface DvCoordinates {
  latitude: number
  longitude: number
}

interface DvIslandValue {
  atollCode: string
  island: string
}

interface DvLocationValue {
  atollCode?: string
  island?: string
  latitude?: number
  longitude?: number
}

export type { DvCoordinates, DvIslandValue, DvLocationValue }
