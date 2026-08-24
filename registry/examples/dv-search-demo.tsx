import * as React from "react"

import { DvSearch, getTextDirection } from "@/registry/components/dv-search"

const people = [
  { name: "އަހުމަދު", detail: "Ahmed Ali" },
  { name: "މަރްޔަމް", detail: "mariyam@example.com" },
]

export function DvSearchDemo() {
  const [query, setQuery] = React.useState("އަހުމަދު")
  const direction = getTextDirection(query)

  return (
    <div lang="dv" dir="rtl" className="grid w-full max-w-md gap-3">
      <label htmlFor="dv-search-demo" className="text-sm font-medium">
        ކަސްޓަމަރެއް ހޯދާ
      </label>
      <DvSearch
        id="dv-search-demo"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="ހޯދާ..."
      />
      <div dir={direction} className="rounded-md border bg-background/40 p-3">
        <div className="grid gap-2">
          {people.map((person) => (
            <div key={person.detail} className="rounded-md border bg-background px-3 py-2 text-sm">
              <bdi dir="auto">{person.name}</bdi>
              <span className="block text-muted-foreground" dir="ltr" lang="en">
                {person.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
