function legacyCopy(value: string) {
  const textArea = document.createElement("textarea")
  textArea.value = value
  textArea.setAttribute("readonly", "")
  textArea.style.position = "fixed"
  textArea.style.opacity = "0"
  document.body.appendChild(textArea)
  textArea.select()

  let copied = false
  try {
    copied = document.execCommand("copy")
  } finally {
    document.body.removeChild(textArea)
  }
  return copied
}

export async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      return legacyCopy(value)
    }
  }
  return legacyCopy(value)
}
