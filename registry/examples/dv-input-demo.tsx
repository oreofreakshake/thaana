import { DvInput } from "@/registry/components/dv-input"

export function DvInputDemo() {
  return (
    <div lang="dv" dir="rtl" className="grid max-w-sm gap-2">
      <label htmlFor="dv-name" className="text-sm font-medium">
        ނަން
      </label>
      <DvInput id="dv-name" placeholder="ނަން ލިޔުއްވާ" />
    </div>
  )
}
