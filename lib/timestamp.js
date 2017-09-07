// Left-pad the given string-representable `value`
// to length `targetLength` with `padString`.
const leftPad = (value, targetLength, padString) => {
  let chars = (new String(value)).split('')

  while (chars.length < targetLength) {
    chars.unshift(padString)
  }

  return chars.join('')
}

// Generates a UTC timestamp string based on the given date object in the
// following format: YYYY-MM-DD_HH-SS.
const timestamp = (date = new Date()) => {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const hour = date.getUTCHours()
  const sec = date.getUTCSeconds()

  const monthString = leftPad(month, 2, '0')
  const dayString = leftPad(day, 2, '0')
  const hourString = leftPad(hour, 2, '0')
  const secString = leftPad(sec, 2, '0')

  return `${year}-${monthString}-${dayString}_${hourString}-${secString}`
}

export default timestamp
