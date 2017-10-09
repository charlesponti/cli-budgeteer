module.exports = {
  addIfDoesntExist,
  addToTotal
}

/**
 * Add a value to an array if it does not exist yet
 * @param {array} currentValues
 * @param {any} newValue
 * @returns {array}
 */
function addIfDoesntExist (currentValues, newValue) {
  return (
    currentValues.indexOf(newValue) === -1 ? [...currentValues, newValue].sort() : currentValues
  )
}

/**
 * Add a value to another value. We do not know if the value we are adding
 * will be a string or a number. Also, if it is a string, we do not know if
 * it will have a comma in it.
 *
 * @param {number} a
 * @param {string|number} b
 * @returns {number}
 */
function addToTotal (a, b) {
  // Round to the nearest second decimal space
  const round = b => Math.round(b * 100) / 100
  if (typeof b === 'string') return round(a + parseFloat(b.replace(',', '')))
  else if (typeof b === 'number') return round(a + b)
  return round(a)
}
