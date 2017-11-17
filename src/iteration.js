const metrics = require("./collecting/metrics")
const storing = require("./storing/storing")

/**
 * Perform a cycle of collecting and storing.
 * @returns {Promise} Signals that the execution has completed successfully
 * or not.
 */
function collectAndStore() {
  console.log("-------------------")
  return metrics.read()
  .then(storing.send)
}

module.exports = {
  collectAndStore
}
