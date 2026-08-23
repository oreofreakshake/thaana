import * as React from "react"

import { Input } from "@/components/ui/input"

type DvInputProps = React.ComponentPropsWithoutRef<typeof Input>

const DvInput = React.forwardRef<HTMLInputElement, DvInputProps>(
  ({ dir = "rtl", lang = "dv", style, ...props }, ref) => (
    <Input ref={ref} dir={dir} lang={lang} style={{ textAlign: "start", ...style }} {...props} />
  )
)

DvInput.displayName = "DvInput"

export { DvInput, type DvInputProps }
