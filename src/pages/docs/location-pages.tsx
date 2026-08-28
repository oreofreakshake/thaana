import {
  DvIslandPickerCustomDemo,
  DvIslandPickerDemo,
  DvIslandPickerDisabledDemo,
  DvIslandPickerLtrDemo,
  DvLocationPickerCustomDemo,
  DvLocationPickerDemo,
  DvLocationPickerWithoutMapDemo,
} from "@/registry/examples/dv-location-picker-demo"
import { ComponentExample } from "@/src/components/component-example"
import {
  installIslandPickerCommands,
  installLocationPickerCommands,
  islandPickerUsage,
  locationPickerUsage,
} from "@/src/content/code-examples"
import { ComponentPage } from "@/src/pages/docs/component-pages"

const islandPreviewCode = `const [value, setValue] = React.useState<DvIslandValue>()

<DvIslandPicker value={value} onValueChange={setValue} />`

const customDataCode = `const customAtolls: MaldivesAtoll[] = [
  {
    code: "SN",
    nameEn: "Sample North Atoll",
    nameDv: "މިސާލު އުތުރު އަތޮޅު",
    abbreviationDv: "ސނ",
    islands: [
      {
        nameEn: "Sample Harbor",
        nameDv: "މިސާލު ބަނދަރު",
        latitude: 4.1755,
        longitude: 73.5093,
      },
    ],
  },
]

<DvIslandPicker
  atolls={customAtolls}
  value={value}
  onValueChange={setValue}
/>`

const disabledCode = `<DvIslandPicker
  value={{ atollCode: "MLE", island: "Malé" }}
  onValueChange={() => undefined}
  disabled
/>`

const ltrCode = `<DvIslandPicker
  value={value}
  onValueChange={setValue}
  dir="ltr"
  lang="en"
  placeholder="Select an island"
  searchPlaceholder="Search islands or atolls..."
/>`

const locationPreviewCode = `const [value, setValue] = React.useState<DvLocationValue>({})

<DvLocationPicker
  value={value}
  onValueChange={setValue}
  fallbackCenter={{ latitude: 4.1755, longitude: 73.5093 }}
  defaultZoom={11}
/>`

const locationCustomDataCode = `<DvLocationPicker
  atolls={customAtolls}
  value={location}
  onValueChange={setLocation}
/>`

const mapDisabledCode = `<DvLocationPicker
  value={location}
  onValueChange={setLocation}
  showMap={false}
/>`

export function IslandPickerPage() {
  return (
    <ComponentPage
      name="DvIslandPicker"
      description="A preloaded, atoll grouped Maldives inhabited island picker with mixed-language search and custom data overrides."
      preview={<DvIslandPickerDemo />}
      previewCode={islandPreviewCode}
      installCommands={installIslandPickerCommands}
      usage={islandPickerUsage}
      rtlBehavior={
        <p>
          The trigger and portalled command menu default to Dhivehi and RTL, including the built-in
          island labels and atoll headings. Search direction follows the first strong character,
          while labels use isolated bidi boundaries. An explicit <code>dir=&quot;ltr&quot;</code>
          switches the built-in visible labels to English.
        </p>
      }
    >
      <div id="built-in-data" className="scroll-m-20">
        <h3>Built-in Maldives data</h3>
        <p>
          No dataset prop is required. The picker ships with 189 inhabited islands grouped by
          structured atoll code and name. Dhivehi labels and coordinates are matched from the
          Maldives Geomatics Department&apos;s OneMap residential island dataset; stable values keep
          the supplied English island name alongside <code>atollCode</code>. Administrative names
          can change, so specialized applications can replace the dataset through{" "}
          <code>atolls</code>.
        </p>
      </div>

      <div id="search" className="scroll-m-20">
        <h3>Grouped search</h3>
        <p>
          Search matches island names, atoll names, atoll codes, and optional Dhivehi names or
          abbreviations. Keyboard navigation and selection come from shadcn Command and Popover.
        </p>
      </div>

      <div id="custom-data" className="scroll-m-20">
        <h3>Custom data</h3>
        <p>
          Passing <code>atolls</code> replaces the built-in list. This is also how applications can
          replace or extend the maintained labels and coordinates. The records below are fictional
          examples.
        </p>
        <ComponentExample code={customDataCode} className="min-h-64">
          <DvIslandPickerCustomDemo />
        </ComponentExample>
      </div>

      <div id="disabled" className="scroll-m-20">
        <h3>Disabled</h3>
        <ComponentExample code={disabledCode} className="min-h-56">
          <DvIslandPickerDisabledDemo />
        </ComponentExample>
      </div>

      <div id="ltr" className="scroll-m-20">
        <h3>LTR interface</h3>
        <p>Direction, language, placeholders, empty text, and class names remain overridable.</p>
        <ComponentExample code={ltrCode} className="min-h-56">
          <DvIslandPickerLtrDemo />
        </ComponentExample>
      </div>
    </ComponentPage>
  )
}

export function LocationPickerPage() {
  return (
    <ComponentPage
      name="DvLocationPicker"
      description="A Maldives ready location form combining the preloaded island picker, accessible coordinates, and a mapcn powered MapLibre map."
      preview={<DvLocationPickerDemo />}
      previewCode={locationPreviewCode}
      installCommands={installLocationPickerCommands}
      usage={locationPickerUsage}
      rtlBehavior={
        <p>
          Island selection and labels default to Dhivehi and RTL. Latitude and longitude are native
          numeric inputs with <code>dir=&quot;ltr&quot;</code>, tabular Latin digits, and geographic
          ranges. The map is never the only way to set or read a location.
        </p>
      }
    >
      <div id="behavior" className="scroll-m-20">
        <h3>Selection behavior</h3>
        <p>
          Selecting an island always sets its atoll code and English name. A complete valid
          coordinate pair from the built-in or custom data replaces the current coordinates and
          focuses the map on that island. If a custom island has no coordinates, manual or map
          selected coordinates remain unchanged. Map clicks, marker dragging, and numeric edits
          update only latitude and longitude.
        </p>
      </div>

      <div id="custom-data" className="scroll-m-20">
        <h3>Custom location data</h3>
        <p>
          Pass the same nested atoll records to replace the built-in dataset and optionally provide
          alternative Dhivehi labels or coordinates.
        </p>
        <ComponentExample code={locationCustomDataCode} className="min-h-64">
          <DvLocationPickerCustomDemo />
        </ComponentExample>
      </div>

      <div id="without-map" className="scroll-m-20">
        <h3>Without a map</h3>
        <p>
          Set <code>showMap=false</code> for forms or rendering environments that should use only
          island selection and accessible coordinate inputs.
        </p>
        <ComponentExample code={mapDisabledCode} className="min-h-80">
          <DvLocationPickerWithoutMapDemo />
        </ComponentExample>
      </div>

      <div id="map-deployment" className="scroll-m-20">
        <h3>Map deployment</h3>
        <p>
          The registry installs mapcn&apos;s <code>@mapcn/map</code> item, which imports MapLibre
          CSS, uses CARTO light and dark styles by default, and loads a version matched MapLibre
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
