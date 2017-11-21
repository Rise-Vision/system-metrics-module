// Common parameters for this module. Test environments may mock these to better suited ones.

const MINUTES = 60000
const DEFAULT_OFFSET = 5
const DEFAULT_INTERVAL = 30

/**
 * Single definition for this module's name.
 */
const MODULE_NAME = "system-metrics"

/**
 * Can be set via environment variable OFFSET. 0 means no delay.
 * @returns {number} milliseconds
 */
function delayForFirstMetric() {
  const value = Number(process.env.OFFSET || DEFAULT_OFFSET)

  return value * MINUTES
}

/**
 * Can be set via environment variable INTERVAL. 0 means no additional
 * readings are desired ( just the initial one )
 * @returns {number} milliseconds
 */
function intervalBetweenReadings() {
  const value = Number(process.env.INTERVAL || DEFAULT_INTERVAL)

  return value * MINUTES
}

function moduleName() {
  return MODULE_NAME
}

module.exports = {delayForFirstMetric, intervalBetweenReadings, moduleName}
