// Common parameters for this module. Test environments may mock these to better suited ones.

// 60 * 1000
const MINUTES = 60000

// Default values.
const DEFAULT_OFFSET = 5
const DEFAULT_INTERVAL = 30

/**
 * @returns {number} milliseconds offset time for the first metric
 */
function offset() {
  const value = Number(process.env.OFFSET || DEFAULT_OFFSET)

  return value * MINUTES
}

/**
 * @returns {number} milliseconds interval between readings
 */
function interval() {
  const value = Number(process.env.INTERVAL || DEFAULT_INTERVAL)

  return value * MINUTES
}

module.exports = {interval, offset}
