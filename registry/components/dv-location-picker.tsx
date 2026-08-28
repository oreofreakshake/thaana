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
import type { DvCoordinates, DvIslandValue, DvLocationValue } from "../lib/location-types"
import { MALDIVES_ATOLLS, type MaldivesAtoll } from "../lib/maldives-locations"
import { DvFormField } from "./dv-form-field"
import { DvInput } from "./dv-input"
import { DvIslandPicker } from "./dv-island-picker"

type DvLocationPickerLabels = {
  island: string
  latitude: string
  longitude: string
  map: string
  mapInstructions: string
  islandPlaceholder: string
  islandSearchPlaceholder: string
  islandEmptyMessage: string
}

type DvLocationPickerProps = {
  atolls?: readonly MaldivesAtoll[]
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
  island: "ރަށް",
  latitude: "ލެޓިޓިއުޑް",
  longitude: "ލޮންޖިޓިއުޑް",
  map: "ތަނުގެ ޗާޓު",
  mapInstructions: "ޗާޓުގައި ކްލިކް ކޮށް ނުވަތަ މާކަރ ދަމާލައި ތަން ހޮވާ.",
  islandPlaceholder: "ރަށެއް ހޮވާ",
  islandSearchPlaceholder: "ރަށެއް ހޯދާ...",
  islandEmptyMessage: "ރަށެއް ނުފެނުނު",
}

function isValidCoordinates(value: Partial<DvCoordinates> | undefined): value is DvCoordinates {
  return (
    value !== undefined &&
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

function updateLocationIsland(
  value: DvLocationValue,
  selected: DvIslandValue,
  atolls: readonly MaldivesAtoll[]
): DvLocationValue {
  const island = findIsland(atolls, selected)
  const nextValue = { ...value, atollCode: selected.atollCode, island: selected.island }
  return isValidCoordinates(island)
    ? { ...nextValue, latitude: island.latitude, longitude: island.longitude }
    : nextValue
}

function findIsland(atolls: readonly MaldivesAtoll[], selected: DvIslandValue) {
  return atolls
    .find((atoll) => atoll.code === selected.atollCode)
    ?.islands.find((island) => island.nameEn === selected.island)
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
  atolls,
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
  const dataset = atolls ?? MALDIVES_ATOLLS
  const coordinates = isValidCoordinates(value) ? value : undefined
  const validFallbackCenter =
    fallbackCenter && isValidCoordinates(fallbackCenter) ? fallbackCenter : undefined
  const initialCenter = coordinates ?? validFallbackCenter ?? { latitude: 0, longitude: 0 }
  const [cameraTarget, setCameraTarget] = React.useState<DvCoordinates>()
  const coordinateId = React.useId()

  function selectCoordinates(nextCoordinates: DvCoordinates) {
    onValueChange(updateLocationCoordinates(value, nextCoordinates))
  }

  function selectIsland(selected: DvIslandValue) {
    const island = findIsland(dataset, selected)
    const nextValue = updateLocationIsland(value, selected, dataset)
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
      <div className="grid gap-2">
        <span className="text-sm font-medium">{labels.island}</span>
        <DvIslandPicker
          atolls={atolls}
          value={
            value.atollCode && value.island
              ? { atollCode: value.atollCode, island: value.island }
              : undefined
          }
          onValueChange={selectIsland}
          disabled={disabled}
          aria-label={labels.island}
          placeholder={labels.islandPlaceholder}
          searchPlaceholder={labels.islandSearchPlaceholder}
          emptyMessage={labels.islandEmptyMessage}
        />
      </div>

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
  findIsland,
  isValidCoordinates,
  updateLocationCoordinates,
  updateLocationIsland,
}
