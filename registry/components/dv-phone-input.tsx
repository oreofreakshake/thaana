"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { DvInput, type DvInputProps } from "./dv-input"

type DvPhoneInputProps = Omit<
  DvInputProps,
  "defaultValue" | "dir" | "lang" | "maxLength" | "onChange" | "type" | "value"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string, valid: boolean) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  containerClassName?: string
}

function getMaldivesPhoneDigits(value: string) {
  const digits = value.replace(/\D/g, "")
  const localDigits = digits.startsWith("960") ? digits.slice(3) : digits
  return /^[79]/.test(localDigits) ? localDigits.slice(0, 7) : ""
}

function formatMaldivesPhone(value: string) {
  const digits = getMaldivesPhoneDigits(value)
  return digits.length > 3 ? `${digits.slice(0, 3)} ${digits.slice(3)}` : digits
}

function toMaldivesE164(value: string) {
  const digits = getMaldivesPhoneDigits(value)
  return digits ? `+960${digits}` : ""
}

function isValidMaldivesPhone(value: string) {
  return /^[79][0-9]{6}$/.test(getMaldivesPhoneDigits(value))
}

const DvPhoneInput = React.forwardRef<HTMLInputElement, DvPhoneInputProps>(
  (
    {
      value,
      defaultValue = "",
      onValueChange,
      onChange,
      className,
      containerClassName,
      inputMode = "tel",
      pattern = "[79][0-9]{2} [0-9]{4}",
      placeholder = "777 1234",
      ...props
    },
    ref
  ) => {
    const controlled = value !== undefined
    const [text, setText] = React.useState(() => formatMaldivesPhone(value ?? defaultValue))

    React.useEffect(() => {
      if (controlled) setText(formatMaldivesPhone(value))
    }, [controlled, value])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const nextText = formatMaldivesPhone(event.currentTarget.value)
      event.currentTarget.value = nextText
      setText(nextText)
      onValueChange?.(toMaldivesE164(nextText), isValidMaldivesPhone(nextText))
      onChange?.(event)
    }

    return (
      <div dir="ltr" data-slot="dv-phone-input" className={cn("relative", containerClassName)}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-3 z-10 flex items-center font-sans text-sm text-muted-foreground"
        >
          +960
        </span>
        <DvInput
          {...props}
          ref={ref}
          type="tel"
          lang="en"
          dir="ltr"
          inputMode={inputMode}
          pattern={pattern}
          maxLength={8}
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
          className={cn("ps-14 font-sans tabular-nums", className)}
          style={{ textAlign: "start", ...props.style }}
        />
      </div>
    )
  }
)

DvPhoneInput.displayName = "DvPhoneInput"

export {
  DvPhoneInput,
  type DvPhoneInputProps,
  formatMaldivesPhone,
  getMaldivesPhoneDigits,
  isValidMaldivesPhone,
  toMaldivesE164,
}
