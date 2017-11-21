const metrics = require("./collecting/metrics")
const logging = require("./logging")

/**
 * Perform a single cycle of collecting and storing.
 * @returns {Promise} Signals that the execution has completed successfully
 * or not.
 */
function collectAndStore() {
  return metrics.read()
  .then(logging.sendMetrics)
}

module.exports = {
  collectAndStore
}
