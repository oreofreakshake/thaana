import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DvSelect } from "@/registry/components/dv-select"

export function DvSelectDemo() {
  return (
    <div lang="dv" dir="rtl" className="grid max-w-sm gap-2">
      <span id="dv-island-label" className="text-sm font-medium">
        ރަށް
      </span>
      <DvSelect>
        <SelectTrigger aria-labelledby="dv-island-label" lang="dv" className="w-full">
          <SelectValue placeholder="ރަށެއް ހޮވާ" />
        </SelectTrigger>
        <SelectContent lang="dv">
          <SelectItem value="male">މާލެ</SelectItem>
          <SelectItem value="hulhumale">ހުޅުމާލެ</SelectItem>
          <SelectItem value="addu-city">އައްޑޫ ސިޓީ</SelectItem>
        </SelectContent>
      </DvSelect>
    </div>
  )
}
