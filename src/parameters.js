// Common parameters for this module. Test environments may mock these to better suited ones.

// 60 * 1000
const MINUTES = 60000

// offset time for the first metric
// later override via parameter
const DEFAULT_OFFSET = 5
const offset = DEFAULT_OFFSET * MINUTES

// interval between readings
// later override via parameter
const DEFAULT_INTERVAL = 30
const interval = DEFAULT_INTERVAL * MINUTES

module.exports = {interval, offset}
