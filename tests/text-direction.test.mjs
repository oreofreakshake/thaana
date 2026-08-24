import assert from "node:assert/strict"
import test from "node:test"

import { getTextDirection } from "../registry/lib/text-direction.ts"

const cases = [
  ["Ahmed", "ltr"],
  ["އަހުމަދު", "rtl"],
  ["Ahmed އަހުމަދު", "ltr"],
  ["އަހުމަދު Ahmed", "rtl"],
  ["INV-2026-001", "ltr"],
  ["support@test.com", "ltr"],
  ["+960 7771234", "ltr"],
  ["12345", "ltr"],
  ["", "ltr"],
]

for (const [query, expected] of cases) {
  test(`${JSON.stringify(query)} resolves to ${expected}`, () => {
    assert.equal(getTextDirection(query), expected)
  })
}

test("neutral input can use an explicit RTL fallback", () => {
  assert.equal(getTextDirection("12345", "rtl"), "rtl")
})
