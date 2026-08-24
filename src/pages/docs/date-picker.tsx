import {
  DvDateOfBirthPickerDemo,
  DvDatePickerDemo,
  DvDateRangePickerDemo,
  DvDateTimePickerDemo,
  DvHijriDatePickerDemo,
} from "@/registry/examples/dv-date-picker-demo"
import { ComponentExample } from "@/src/components/component-example"
import { datePickerUsage, installDatePickerCommands } from "@/src/content/code-examples"
import { ComponentPage } from "@/src/pages/docs/component-pages"

const basicCode = `const [date, setDate] = React.useState<Date>()

<DvDatePicker value={date} onValueChange={setDate} />`

const rangeCode = `const [range, setRange] = React.useState<DateRange>()

<DvDatePicker
  mode="range"
  value={range}
  onValueChange={setRange}
  calendarProps={{ numberOfMonths: 2 }}
/>`

const hijriCode = `<DvDatePicker
  calendar="hijri"
  value={date}
  onValueChange={setDate}
/>`

const dateOfBirthCode = `<DvDatePicker
  value={date}
  onValueChange={setDate}
  placeholder="އުފަން ތާރީޚު ހޮވާ"
  calendarProps={{
    captionLayout: "dropdown",
    startMonth: new Date(1940, 0, 1),
    endMonth: new Date(),
  }}
/>`

const dateTimeCode = `<div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
  <DvDatePicker value={date} onValueChange={setDate} />
  <DvInput
    type="time"
    dir="ltr"
    lang="en"
    defaultValue="09:00"
    aria-label="ގަޑި"
  />
</div>`

export function DatePickerPage() {
  return (
    <ComponentPage
      name="DvDatePicker"
      description="A shadcn-style date picker with Gregorian and Umm al-Qura Hijri calendars, both using Dhivehi month and weekday labels."
      preview={<DvDatePickerDemo />}
      previewCode={basicCode}
      installCommands={installDatePickerCommands}
      usage={datePickerUsage}
      rtlBehavior={
        <p>
          The trigger, portalled popover, and calendar all receive local Dhivehi and RTL defaults.
          Navigation, range corners, spacing, and alignment use logical directions. As with other
          Thaana components, applications can still override <code>dir</code> and <code>lang</code>.
        </p>
      }
    >
      <div id="hijri-calendar" className="scroll-m-20">
        <h3>Hijri calendar</h3>
        <p>
          Set <code>calendar=&quot;hijri&quot;</code> to use the Umm al-Qura calendar with Dhivehi
          month and weekday labels.
        </p>
        <ComponentExample code={hijriCode}>
          <DvHijriDatePickerDemo />
        </ComponentExample>
      </div>

      <div id="date-range" className="scroll-m-20">
        <h3>Date range</h3>
        <p>Select a start and end date from two adjacent months.</p>
        <ComponentExample code={rangeCode}>
          <DvDateRangePickerDemo />
        </ComponentExample>
      </div>

      <div id="date-of-birth" className="scroll-m-20">
        <h3>Date of birth</h3>
        <p>Use month and year dropdowns when navigating across many years.</p>
        <ComponentExample code={dateOfBirthCode}>
          <DvDateOfBirthPickerDemo />
        </ComponentExample>
      </div>

      <div id="date-and-time" className="scroll-m-20">
        <h3>Date and time</h3>
        <p>Compose the picker with a native time input; the time value stays isolated as LTR.</p>
        <ComponentExample code={dateTimeCode}>
          <DvDateTimePickerDemo />
        </ComponentExample>
      </div>

      <div id="calendar-model" className="scroll-m-20">
        <h3>Calendar model</h3>
        <p>
          Gregorian is the default, with Dhivehi month and weekday labels. Set
          <code>calendar=&quot;hijri&quot;</code> for Umm al-Qura display. Both modes return normal
          JavaScript <code>Date</code> objects, keeping API payloads and form libraries
          framework-neutral. The Hijri calendar supports Gregorian dates from 1 August 1924 through
          16 November 2077.
        </p>
      </div>
    </ComponentPage>
  )
}
