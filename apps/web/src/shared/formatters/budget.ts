export function formatBudgetRange(value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return ''
  }

  const alreadyHasCurrency = /€|eur|euro/i.test(trimmedValue)
  const includesNumber = /\d/.test(trimmedValue)

  if (!includesNumber || alreadyHasCurrency) {
    return trimmedValue
  }

  return `${trimmedValue} €`
}
