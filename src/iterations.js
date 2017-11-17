// Iteration loop, separated to facilitate integration tests

const iteration = require("./iteration")
const parameters = require("./parameters")

let timerId = null

/**
 * Collect the metrics, store them, and report any errors.
 * @returns {void}
 */
function collectAndStoreMetrics() {
  iteration.collectAndStore()
  .catch(console.log)
  // should errors go to logging module ?
}

/**
 * Program the next iterations if an interval was set.
 * @returns {void}
 */
function programNextIteration() {
  if (parameters.interval() > 0) {
    timerId = setInterval(collectAndStoreMetrics, parameters.interval())
  }
}

/**
 * Start the metrics collection process. Performs a first collecting task,
 * and programs the next ones.
 * @returns {void}
 */
function startCollectingMetrics() {
  collectAndStoreMetrics()

  programNextIteration()
}

/**
 *Iteration loop, programs first and subsequent executions.
 * @returns {void}
 */
function execute() {
  // safety catch, stop any previous execution.
  stop()

  if (parameters.offset() === 0) {
    startCollectingMetrics()
  } else {
    setTimeout(startCollectingMetrics, parameters.offset())
  }
}

function stop() {
  if (timerId) {
    clearInterval(timerId)

    timerId = null
  }
}

module.exports = {execute, stop}
