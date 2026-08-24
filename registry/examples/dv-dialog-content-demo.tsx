import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DvDialogContent } from "@/registry/components/dv-dialog-content"
import { DvInput } from "@/registry/components/dv-input"

export function DvDialogContentDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" lang="dv" dir="rtl">
          ޑައިލޮގް ހުޅުވާ
        </Button>
      </DialogTrigger>
      <DvDialogContent>
        <DialogHeader>
          <DialogTitle>ކަސްޓަމަރ ބަދަލު ކުރުން</DialogTitle>
          <DialogDescription>ކަސްޓަމަރުގެ ނަން ބަދަލު ކުރައްވާ.</DialogDescription>
        </DialogHeader>
        <DvInput aria-label="ނަން" defaultValue="އަހުމަދު އަލީ" />
      </DvDialogContent>
    </Dialog>
  )
}
