"use client"

import * as React from "react"

import {
  MapControls,
  MapMarker,
  type MapStyleOption,
  Map as MapView,
  MarkerContent,
  useMap,
} from "@/components/ui/map"
import { cn } from "@/lib/utils"
import type { DvAtoll, DvCoordinates, DvIsland, DvLocationValue } from "../lib/location-types"
import { DvAtollPicker } from "./dv-atoll-picker"
import { DvFormField } from "./dv-form-field"
import { DvInput } from "./dv-input"
import { DvIslandPicker } from "./dv-island-picker"

type DvLocationPickerLabels = {
  atoll: string
  island: string
  latitude: string
  longitude: string
  map: string
  mapInstructions: string
  atollPlaceholder: string
  atollSearchPlaceholder: string
  atollEmptyMessage: string
  islandPlaceholder: string
  islandSearchPlaceholder: string
  islandEmptyMessage: string
}

type DvLocationPickerProps = {
  atolls?: readonly DvAtoll[]
  islands?: readonly DvIsland[]
  value: DvLocationValue
  onValueChange: (value: DvLocationValue) => void
  showMap?: boolean
  fallbackCenter?: DvCoordinates
  defaultZoom?: number
  selectedZoom?: number
  mapStyles?: { light?: MapStyleOption; dark?: MapStyleOption }
  labels?: Partial<DvLocationPickerLabels>
  disabled?: boolean
  className?: string
  mapClassName?: string
}

const defaultLabels: DvLocationPickerLabels = {
  atoll: "އަތޮޅު",
  island: "ރަށް",
  latitude: "ލެޓިޓިއުޑް",
  longitude: "ލޮންޖިޓިއުޑް",
  map: "ތަނުގެ ޗާޓު",
  mapInstructions: "ޗާޓުގައި ކްލިކް ކޮށް ނުވަތަ މާކަރ ދަމާލައި ތަން ހޮވާ.",
  atollPlaceholder: "އަތޮޅެއް ހޮވާ",
  atollSearchPlaceholder: "އަތޮޅެއް ހޯދާ...",
  atollEmptyMessage: "އަތޮޅެއް ނުފެނުނު",
  islandPlaceholder: "ރަށެއް ހޮވާ",
  islandSearchPlaceholder: "ރަށެއް ހޯދާ...",
  islandEmptyMessage: "ރަށެއް ނުފެނުނު",
}

function isValidCoordinates(
  value: Pick<DvLocationValue, "latitude" | "longitude">
): value is DvCoordinates {
  return (
    typeof value.latitude === "number" &&
    Number.isFinite(value.latitude) &&
    value.latitude >= -90 &&
    value.latitude <= 90 &&
    typeof value.longitude === "number" &&
    Number.isFinite(value.longitude) &&
    value.longitude >= -180 &&
    value.longitude <= 180
  )
}

function updateLocationAtoll(
  value: DvLocationValue,
  atollId: string,
  islands: readonly DvIsland[]
): DvLocationValue {
  const selectedIsland = islands.find((island) => island.id === value.islandId)
  const islandId = selectedIsland?.atollId === atollId ? value.islandId : undefined
  return { ...value, atollId: atollId || undefined, islandId }
}

function updateLocationIsland(
  value: DvLocationValue,
  islandId: string,
  islands: readonly DvIsland[]
): DvLocationValue {
  const island = islands.find((entry) => entry.id === islandId)
  if (!island) return { ...value, islandId: islandId || undefined }

  const nextValue = { ...value, atollId: island.atollId, islandId: island.id }
  return isValidCoordinates(island)
    ? { ...nextValue, latitude: island.latitude, longitude: island.longitude }
    : nextValue
}

function updateLocationCoordinates(
  value: DvLocationValue,
  coordinates: Partial<DvCoordinates>
): DvLocationValue {
  return { ...value, ...coordinates }
}

function MapClickHandler({ onSelect }: { onSelect: (coordinates: DvCoordinates) => void }) {
  const { map } = useMap()
  const onSelectRef = React.useRef(onSelect)
  onSelectRef.current = onSelect

  React.useEffect(() => {
    if (!map) return
    const handleClick = (event: { lngLat: { lat: number; lng: number } }) => {
      onSelectRef.current({ latitude: event.lngLat.lat, longitude: event.lngLat.lng })
    }
    map.on("click", handleClick)
    return () => {
      map.off("click", handleClick)
    }
  }, [map])

  return null
}

function MapCamera({ target, zoom }: { target?: DvCoordinates; zoom: number }) {
  const { map } = useMap()

  React.useEffect(() => {
    if (map && target) map.flyTo({ center: [target.longitude, target.latitude], zoom })
  }, [map, target, zoom])

  return null
}

type CoordinateInputProps = {
  id: string
  label: string
  value?: number
  min: number
  max: number
  disabled: boolean
  onValueChange: (value?: number) => void
}

function CoordinateInput({
  id,
  label,
  value,
  min,
  max,
  disabled,
  onValueChange,
}: CoordinateInputProps) {
  const [text, setText] = React.useState(value?.toString() ?? "")
  const [focused, setFocused] = React.useState(false)
  const parsed = text === "" ? undefined : Number(text)
  const invalid = parsed !== undefined && (!Number.isFinite(parsed) || parsed < min || parsed > max)

  React.useEffect(() => {
    if (!focused) setText(value?.toString() ?? "")
  }, [focused, value])

  return (
    <DvFormField label={label} controlId={id} error={invalid ? `${min}–${max}` : undefined}>
      <DvInput
        type="number"
        inputMode="decimal"
        step="any"
        min={min}
        max={max}
        value={text}
        disabled={disabled}
        lang="en"
        dir="ltr"
        className="font-sans tabular-nums"
        style={{ textAlign: "start" }}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          if (invalid) setText(value?.toString() ?? "")
        }}
        onChange={(event) => {
          const nextText = event.currentTarget.value
          setText(nextText)
          if (nextText === "") onValueChange(undefined)
          else {
            const nextValue = Number(nextText)
            if (Number.isFinite(nextValue) && nextValue >= min && nextValue <= max) {
              onValueChange(nextValue)
            }
          }
        }}
      />
    </DvFormField>
  )
}

function DvLocationPicker({
  atolls = [],
  islands = [],
  value,
  onValueChange,
  showMap = true,
  fallbackCenter,
  defaultZoom = 2,
  selectedZoom = 13,
  mapStyles,
  labels: labelsProp,
  disabled = false,
  className,
  mapClassName,
}: DvLocationPickerProps) {
  const labels = { ...defaultLabels, ...labelsProp }
  const coordinates = isValidCoordinates(value) ? value : undefined
  const validFallbackCenter =
    fallbackCenter && isValidCoordinates(fallbackCenter) ? fallbackCenter : undefined
  const initialCenter = coordinates ?? validFallbackCenter ?? { latitude: 0, longitude: 0 }
  const [cameraTarget, setCameraTarget] = React.useState<DvCoordinates>()
  const coordinateId = React.useId()

  function selectCoordinates(nextCoordinates: DvCoordinates) {
    onValueChange(updateLocationCoordinates(value, nextCoordinates))
  }

  function selectIsland(islandId: string) {
    const island = islands.find((entry) => entry.id === islandId)
    const nextValue = updateLocationIsland(value, islandId, islands)
    onValueChange(nextValue)
    if (island && isValidCoordinates(island)) {
      setCameraTarget({ latitude: island.latitude, longitude: island.longitude })
    }
  }

  return (
    <div
      data-slot="dv-location-picker"
      lang="dv"
      dir="rtl"
      className={cn("grid w-full gap-5", className)}
    >
      {atolls.length > 0 ? (
        <div className="grid gap-2">
          <span className="text-sm font-medium">{labels.atoll}</span>
          <DvAtollPicker
            atolls={atolls}
            value={value.atollId}
            onValueChange={(atollId) => onValueChange(updateLocationAtoll(value, atollId, islands))}
            disabled={disabled}
            aria-label={labels.atoll}
            placeholder={labels.atollPlaceholder}
            searchPlaceholder={labels.atollSearchPlaceholder}
            emptyMessage={labels.atollEmptyMessage}
          />
        </div>
      ) : null}

      {islands.length > 0 ? (
        <div className="grid gap-2">
          <span className="text-sm font-medium">{labels.island}</span>
          <DvIslandPicker
            islands={islands}
            atollId={value.atollId}
            value={value.islandId}
            onValueChange={selectIsland}
            disabled={disabled}
            aria-label={labels.island}
            placeholder={labels.islandPlaceholder}
            searchPlaceholder={labels.islandSearchPlaceholder}
            emptyMessage={labels.islandEmptyMessage}
          />
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <CoordinateInput
          id={`${coordinateId}-latitude`}
          label={labels.latitude}
          value={value.latitude}
          min={-90}
          max={90}
          disabled={disabled}
          onValueChange={(latitude) =>
            onValueChange(updateLocationCoordinates(value, { latitude }))
          }
        />
        <CoordinateInput
          id={`${coordinateId}-longitude`}
          label={labels.longitude}
          value={value.longitude}
          min={-180}
          max={180}
          disabled={disabled}
          onValueChange={(longitude) =>
            onValueChange(updateLocationCoordinates(value, { longitude }))
          }
        />
      </div>

      {showMap ? (
        <div className="grid gap-2">
          <div>
            <p className="m-0 text-sm font-medium text-foreground">{labels.map}</p>
            <p className="mt-1 text-sm text-muted-foreground">{labels.mapInstructions}</p>
          </div>
          <section
            aria-label={labels.map}
            className={cn("h-80 overflow-hidden rounded-lg border bg-muted", mapClassName)}
          >
            <MapView
              center={[initialCenter.longitude, initialCenter.latitude]}
              zoom={coordinates ? selectedZoom : defaultZoom}
              styles={mapStyles}
            >
              {disabled ? null : <MapClickHandler onSelect={selectCoordinates} />}
              <MapCamera target={cameraTarget} zoom={selectedZoom} />
              <MapControls position="top-left" showZoom showLocate={false} />
              {coordinates ? (
                <MapMarker
                  longitude={coordinates.longitude}
                  latitude={coordinates.latitude}
                  draggable={!disabled}
                  onDragEnd={({ lat, lng }) => selectCoordinates({ latitude: lat, longitude: lng })}
                >
                  <MarkerContent>
                    <span
                      aria-hidden="true"
                      className="block size-4 rounded-full border-2 border-white bg-primary shadow-md"
                    />
                  </MarkerContent>
                </MapMarker>
              ) : null}
            </MapView>
          </section>
        </div>
      ) : null}
    </div>
  )
}

export {
  DvLocationPicker,
  type DvLocationPickerLabels,
  type DvLocationPickerProps,
  defaultLabels as dvLocationPickerDefaultLabels,
  isValidCoordinates,
  updateLocationAtoll,
  updateLocationCoordinates,
  updateLocationIsland,
}
