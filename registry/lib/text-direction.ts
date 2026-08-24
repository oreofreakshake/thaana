type TextDirection = "ltr" | "rtl"

const rtlLetter =
  /[\p{Script=Thaana}\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Syriac}\p{Script=Nko}\p{Script=Adlam}]/u
const letter = /\p{Letter}/u

function getTextDirection(value: string, fallback: TextDirection = "ltr"): TextDirection {
  for (const character of value) {
    if (rtlLetter.test(character)) return "rtl"
    if (letter.test(character)) return "ltr"
  }

  return fallback
}

export { getTextDirection, type TextDirection }
