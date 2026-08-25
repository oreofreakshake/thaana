import {
  DvAtollPickerDemo,
  DvIslandPickerDemo,
  DvLocationPickerDemo,
  DvLocationPickerWithoutMapDemo,
} from "@/registry/examples/dv-location-picker-demo"
import { ComponentExample } from "@/src/components/component-example"
import {
  atollPickerUsage,
  installAtollPickerCommands,
  installIslandPickerCommands,
  installLocationPickerCommands,
  islandPickerUsage,
  locationPickerUsage,
} from "@/src/content/code-examples"
import { ComponentPage } from "@/src/pages/docs/component-pages"

const atollPreviewCode = `<DvAtollPicker
  atolls={atolls}
  value={atollId}
  onValueChange={setAtollId}
/>`

const islandPreviewCode = `<DvIslandPicker
  islands={islands}
  atollId={atollId}
  value={islandId}
  onValueChange={setIslandId}
/>`

const locationPreviewCode = `<DvLocationPicker
  atolls={atolls}
  islands={islands}
  value={location}
  onValueChange={setLocation}
  fallbackCenter={{ latitude: 4.1755, longitude: 73.5093 }}
  defaultZoom={11}
/>`

const customDataCode = `const atolls: DvAtoll[] = [
  {
    id: "custom-a",
    code: "CA",
    nameDv: "މިސާލު އަތޮޅު",
    nameEn: "Custom Atoll",
  },
]

const islands: DvIsland[] = [
  {
    id: "custom-island",
    atollId: "custom-a",
    nameDv: "މިސާލު ރަށް",
    nameEn: "Custom Island",
    latitude: 4.1755,
    longitude: 73.5093,
  },
]`

const mapDisabledCode = `<DvLocationPicker
  atolls={atolls}
  islands={islands}
  value={location}
  onValueChange={setLocation}
  showMap={false}
/>`

const dhivehiLabelsCode = `<DvLocationPicker
  value={location}
  onValueChange={setLocation}
  labels={{
    atoll: "އަތޮޅު",
    island: "ރަށް",
    map: "ލޮކޭޝަން ނަގާ",
  }}
  showMap={false}
/>`

const mixedLanguageCode = `const islands: DvIsland[] = [
  {
    id: "sample-harbor",
    atollId: "sample-north",
    nameDv: "މިސާލު ބަނދަރު",
    nameEn: "Sample Harbor",
  },
]`

export function AtollPickerPage() {
  return (
    <ComponentPage
      name="DvAtollPicker"
      description="A controlled, searchable atoll picker for consumer-supplied Dhivehi and English place data."
      preview={<DvAtollPickerDemo />}
      previewCode={atollPreviewCode}
      installCommands={installAtollPickerCommands}
      usage={atollPickerUsage}
      rtlBehavior={
        <p>
          The picker composes <code>DvCombobox</code>, so its trigger, search field, keyboard
          navigation, portalled content, and bidi isolation follow the existing Thaana behavior.
          Dhivehi and English names, codes, and IDs are all searchable.
        </p>
      }
    >
      <div id="data-model" className="scroll-m-20">
        <h3>Data model</h3>
        <p>
          Supply stable IDs plus <code>nameDv</code>, <code>nameEn</code>, and an optional
          <code>code</code>. Thaana does not bundle or fetch atoll data.
        </p>
      </div>
    </ComponentPage>
  )
}

export function IslandPickerPage() {
  return (
    <ComponentPage
      name="DvIslandPicker"
      description="A controlled mixed-language island picker with optional atoll filtering."
      preview={<DvIslandPickerDemo />}
      previewCode={islandPreviewCode}
      installCommands={installIslandPickerCommands}
      usage={islandPickerUsage}
      rtlBehavior={
        <p>
          It inherits the same mixed-direction search and portal-safe RTL behavior from
          <code>DvCombobox</code>. Passing <code>atollId</code> limits the available islands without
          changing the supplied dataset.
        </p>
      }
    >
      <div id="filtering" className="scroll-m-20">
        <h3>Filtering by atoll</h3>
        <p>
          Island records reference an atoll through <code>atollId</code>. Omit the picker&apos;s
          <code>atollId</code> prop when every island should remain searchable.
        </p>
      </div>
    </ComponentPage>
  )
}

export function LocationPickerPage() {
  return (
    <ComponentPage
      name="DvLocationPicker"
      description="A data-driven Dhivehi location form that combines atoll and island selection, accessible coordinates, and a mapcn-powered MapLibre map."
      preview={<DvLocationPickerDemo />}
      previewCode={locationPreviewCode}
      installCommands={installLocationPickerCommands}
      usage={locationPickerUsage}
      rtlBehavior={
        <p>
          Labels and selection controls default to Dhivehi and RTL. Latitude and longitude are
          native numeric inputs with <code>dir=&quot;ltr&quot;</code>, tabular Latin digits, and
          geographic ranges. The map is never the only way to set or read a location.
        </p>
      }
    >
      <div id="behavior" className="scroll-m-20">
        <h3>Selection behavior</h3>
        <p>
          Changing atoll clears an incompatible island but retains coordinates. An island with a
          valid coordinate pair updates and focuses the marker; an island without coordinates
          retains manually entered or map-selected coordinates. Map clicks and marker dragging
          update only latitude and longitude.
        </p>
      </div>

      <div id="dhivehi-labels" className="scroll-m-20">
        <h3>Dhivehi labels</h3>
        <p>
          The built-in UI copy is Dhivehi, and every label and picker message can be replaced
          through the small <code>labels</code> object.
        </p>
        <ComponentExample code={dhivehiLabelsCode} className="min-h-80">
          <DvLocationPickerWithoutMapDemo />
        </ComponentExample>
      </div>

      <div id="mixed-language" className="scroll-m-20">
        <h3>Mixed-language place names</h3>
        <p>
          Each option shows its Dhivehi and English names inside a bidi boundary. Search accepts
          either script, along with the stable record ID and atoll code where available.
        </p>
        <ComponentExample code={mixedLanguageCode} className="min-h-64">
          <DvIslandPickerDemo />
        </ComponentExample>
      </div>

      <div id="custom-data" className="scroll-m-20">
        <h3>Custom data</h3>
        <p>
          All place data comes from your application. The example records below are deliberately
          fictional and exist only to demonstrate the serializable data shape.
        </p>
        <ComponentExample code={customDataCode} className="min-h-64">
          <DvIslandPickerDemo />
        </ComponentExample>
      </div>

      <div id="without-map" className="scroll-m-20">
        <h3>Without a map</h3>
        <p>
          Set <code>showMap=false</code> for forms or rendering environments that should use only
          the pickers and accessible coordinate inputs.
        </p>
        <ComponentExample code={mapDisabledCode} className="min-h-80">
          <DvLocationPickerWithoutMapDemo />
        </ComponentExample>
      </div>

      <div id="map-deployment" className="scroll-m-20">
        <h3>Map deployment</h3>
        <p>
          The registry installs mapcn&apos;s <code>@mapcn/map</code> item, which imports MapLibre
          CSS, uses CARTO light and dark styles by default, and loads a version-matched MapLibre
          worker from <code>unpkg.com</code>. No map token is required for the default styles.
        </p>
        <p>
          For a strict content security policy, allow the worker source described by mapcn and the
          network origins used by your selected map style and tiles. Mapcn documents
          <code>script-src &apos;self&apos; https://unpkg.com</code> and
          <code>worker-src &apos;self&apos; blob:</code>. Also permit <code>data:</code> and
          <code>blob:</code> images where MapLibre requires them. To avoid the CDN worker, copy
          <code>maplibre-gl-worker.mjs</code> and <code>maplibre-gl-shared.mjs</code> side by side
          into the host&apos;s public directory and point mapcn&apos;s installed map primitive at
          the local worker file.
        </p>
        <p>
          The map component is client-side and carries <code>&quot;use client&quot;</code>. Mapcn
          guards browser initialization and delays map children until MapLibre exists. Vite SSR
          hosts such as Astro or TanStack Start may need{" "}
          <code>ssr.noExternal: [&quot;maplibre-gl&quot;]</code>.
        </p>
      </div>
    </ComponentPage>
  )
}
