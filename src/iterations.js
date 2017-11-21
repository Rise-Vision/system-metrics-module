// Iteration loop, separated to facilitate integration tests

const iteration = require("./iteration")
const logging = require("./logging")
const parameters = require("./parameters")

let timerId = null

function collectAndStoreMetrics() {
  iteration.collectAndStore()
  .catch(error=>
  {
    const detail = error.message || JSON.stringify(error)

    logging.error(detail, "Error while collecting metrics.")
  })
}

function startCollectingMetrics() {
  // first iteration
  collectAndStoreMetrics()

  const interval = parameters.intervalBetweenReadings()

  // next iterations
  if (interval > 0) {
    timerId = setInterval(collectAndStoreMetrics, interval)
  }
}

/**
 * Iteration loop, programs first and subsequent executions.
 * @returns {void}
 */
function execute() {
  // safety catch, stop any previous execution.
  stop()

  const offset = parameters.delayForFirstMetric()

  setTimeout(startCollectingMetrics, offset)
}

function stop() {
  if (timerId) {
    clearInterval(timerId)

    timerId = null
  }
}

module.exports = {execute, stop}
