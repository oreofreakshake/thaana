import type * as React from "react"

import { DialogContent } from "@/components/ui/dialog"

type DvDialogContentProps = React.ComponentProps<typeof DialogContent>

function DvDialogContent({ dir = "rtl", lang = "dv", ...props }: DvDialogContentProps) {
  return <DialogContent dir={dir} lang={lang} {...props} />
}

export { DvDialogContent, type DvDialogContentProps }
