"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { DvInput, type DvInputProps } from "./dv-input"

type DvCurrencyInputProps = Omit<
  DvInputProps,
  "defaultValue" | "dir" | "lang" | "onChange" | "type" | "value"
> & {
  value?: number | null
  defaultValue?: number | null
  onValueChange?: (value: number | null) => void
  onValidityChange?: (valid: boolean) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  containerClassName?: string
  invalidMessage?: string
}

const mvrFormatter = new Intl.NumberFormat("en-MV", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
})

function formatMvr(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? mvrFormatter.format(value) : ""
}

function sanitizeMvrInput(value: string) {
  const normalized = value.replaceAll(",", "").replace(/[^0-9.]/g, "")
  const [integer = "", ...fractionParts] = normalized.split(".")
  const fraction = fractionParts.join("").slice(0, 2)
  return fractionParts.length > 0 ? `${integer}.${fraction}` : integer
}

function parseMvr(value: string) {
  const parsed = Number.parseFloat(value.replaceAll(",", ""))
  return Number.isFinite(parsed) ? parsed : null
}

function isMvrValueInRange(
  value: number | null,
  min: string | number | undefined,
  max: string | number | undefined
) {
  if (value === null) return true
  const minimum = min === undefined ? undefined : Number(min)
  const maximum = max === undefined ? undefined : Number(max)
  return !(
    (Number.isFinite(minimum) && value < Number(minimum)) ||
    (Number.isFinite(maximum) && value > Number(maximum))
  )
}

function RufiyaaSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 276.85077 175.59682"
      className={cn("h-4 w-6", className)}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m 0.01444349,146.48136 c 0.292039,-6.44722 3.89308401,-9.12968 9.18909001,-9.48871 1.2523995,-0.0849 2.7807995,-0.0849 4.8186995,0 7.677319,0.0719 15.575535,2.04677 23.196,0.32719 3.328697,-0.83215 38.545925,-17.3522 71.890297,-40.525298 -6.38484,-3.92558 -9.558207,-9.227296 -9.06617,-16.8414 0.1618,-1.45617 2.26605,-16.30132 20.6841,-14.74007 2.82949,0.2398 11.06017,2.89394 24.6766,7.89527 4.8434,-4.011342 9.86993,-7.792775 14.86,-11.6179 -8.69961,-3.530822 -11.46541,-11.291021 -10.04177,-20.1135 1.42405,-8.825035 8.66169,-13.705029 19.0329,-11.88805 9.23153,1.617223 19.00984,5.215984 22.8004,6.7845 20.70075,-11.189327 54.77683,-28.8770828 65.3541,-34.0729998 5.70626,-3.35254 12.71464,-3.19857098 16.5862,2.73179 4.21557,6.6454798 3.9892,13.2813598 -2.19151,17.9821998 -8.64301,6.573585 -19.44036,9.920412 -29.2398,14.5974 -6.93317,3.490262 -13.93101,6.864024 -20.6089,10.8298 21.25669,6.267982 27.73865,10.456642 28.27166,22.5229 0.0826,1.868798 -0.20263,3.745 -0.64544,5.3661 -1.21907,4.462958 -5.06847,10.963331 -17.1941,9.7415 -5.09154,-0.513098 -25.58805,-6.353594 -42.9433,-12.0531 -4.15228,3.73688 -8.78178,6.907135 -13.2389,10.267 9.60154,3.066049 21.58993,6.56711 24.4216,17.486898 0.24324,1.08936 0.96989,5.15913 -0.58539,9.4564 -2.62403,7.6132 -9.24819,10.55389 -16.7664,10.1919 -3.54102,-0.12568 -18.38167,-3.16212 -42.9144,-12.18824 -26.82393,18.68149 -64.679357,43.44745 -92.643497,57.009 -5.389878,2.61389 -21.064916,10.09114 -30.0955,9.4114 -5.029255,-0.37856 -10.4541355,-5.68673 -13.6177995,-11.67795 -4.32270801,-8.18616 -4.01566901,-16.80012 -3.98877001,-17.39403 z" />
    </svg>
  )
}

const DvCurrencyInput = React.forwardRef<HTMLInputElement, DvCurrencyInputProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      onValidityChange,
      onChange,
      onBlur,
      onFocus,
      className,
      containerClassName,
      invalidMessage = "ފައިސާގެ ރަނގަޅު އަދަދެއް ލިޔުއްވާ.",
      min = 0,
      max,
      step = 0.01,
      inputMode = "decimal",
      ...props
    },
    ref
  ) => {
    const controlled = value !== undefined
    const [text, setText] = React.useState(() => formatMvr(value ?? defaultValue))
    const [focused, setFocused] = React.useState(false)

    React.useEffect(() => {
      if (controlled && !focused) setText(formatMvr(value))
    }, [controlled, focused, value])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const nextText = sanitizeMvrInput(event.currentTarget.value)
      const numericValue = parseMvr(nextText)
      const valid = isMvrValueInRange(numericValue, min, max)
      event.currentTarget.value = nextText
      event.currentTarget.setCustomValidity(valid ? "" : invalidMessage)
      setText(nextText)
      onValueChange?.(numericValue)
      onValidityChange?.(valid)
      onChange?.(event)
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
      setFocused(true)
      setText(sanitizeMvrInput(text))
      onFocus?.(event)
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      setFocused(false)
      const numericValue = parseMvr(text)
      const valid = isMvrValueInRange(numericValue, min, max)
      event.currentTarget.setCustomValidity(valid ? "" : invalidMessage)
      setText(formatMvr(numericValue))
      onValueChange?.(numericValue)
      onValidityChange?.(valid)
      onBlur?.(event)
    }

    return (
      <div dir="ltr" data-slot="dv-currency-input" className={cn("relative", containerClassName)}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 end-3 z-10 flex items-center text-muted-foreground"
        >
          <RufiyaaSymbol />
        </span>
        <DvInput
          {...props}
          ref={ref}
          type="text"
          lang="en"
          dir="ltr"
          min={min}
          max={max}
          step={step}
          inputMode={inputMode}
          value={text}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn("pe-11 font-sans tabular-nums", className)}
          style={{ textAlign: "end", ...props.style }}
        />
      </div>
    )
  }
)

DvCurrencyInput.displayName = "DvCurrencyInput"

export {
  DvCurrencyInput,
  type DvCurrencyInputProps,
  formatMvr,
  isMvrValueInRange,
  parseMvr,
  RufiyaaSymbol,
  sanitizeMvrInput,
}
