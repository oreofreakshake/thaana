import * as React from "react"

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

type DvFormControlProps = {
  id?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-required"?: boolean | "true" | "false"
  required?: boolean
}

type DvFormFieldProps = Omit<React.ComponentProps<typeof Field>, "children"> & {
  children: React.ReactElement<DvFormControlProps>
  label: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  controlId?: string
}

function DvFormField({
  children,
  label,
  description,
  error,
  required = false,
  controlId,
  dir = "rtl",
  lang = "dv",
  ...props
}: DvFormFieldProps) {
  const generatedId = React.useId()
  const id = children.props.id ?? controlId ?? `dv-field-${generatedId}`
  const descriptionId = description ? `${id}-description` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [children.props["aria-describedby"], descriptionId, errorId]
    .filter(Boolean)
    .join(" ")

  const control = React.cloneElement(children, {
    id,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : children.props["aria-invalid"],
    "aria-required": required || children.props["aria-required"] || undefined,
    required: required || children.props.required || undefined,
  })

  return (
    <Field dir={dir} lang={lang} data-invalid={Boolean(error)} {...props}>
      <FieldLabel htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        )}
      </FieldLabel>
      {control}
      {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </Field>
  )
}

export { DvFormField, type DvFormFieldProps }
