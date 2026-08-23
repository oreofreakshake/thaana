export const installInput = "pnpm dlx shadcn@latest add oreofreakshake/thaana/dv-input"

export const installSelect = "pnpm dlx shadcn@latest add oreofreakshake/thaana/dv-select"

export const inputUsage = `import { DvInput } from "@/components/dv-input"

export function NameField() {
  return <DvInput placeholder="ނަން ލިޔުއްވާ" />
}`

export const selectUsage = `import { DvSelect } from "@/components/dv-select"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function IslandField() {
  return (
    <DvSelect>
      <SelectTrigger lang="dv">
        <SelectValue placeholder="ރަށެއް ހޮވާ" />
      </SelectTrigger>
      <SelectContent lang="dv">
        <SelectItem value="male">މާލެ</SelectItem>
        <SelectItem value="hulhumale">ހުޅުމާލެ</SelectItem>
      </SelectContent>
    </DvSelect>
  )
}`

export const documentDirection = `<html lang="dv" dir="rtl">`

export const directionProvider = `<DirectionProvider direction="rtl">
  <App />
</DirectionProvider>`

export const bidiExamples = `<span dir="ltr">support@example.com</span>
<span dir="ltr">+960 777-1234</span>
<bdi dir="ltr">MVR 1,250.00</bdi>
<bdi>{userGeneratedName}</bdi>`
