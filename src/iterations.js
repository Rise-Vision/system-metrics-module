// Iteration loop, separated to facilitate integration tests

const ERROR_TYPE = "error"

const ipc = require("./ipc")
const iteration = require("./iteration")
const parameters = require("./parameters")

let timerId = null

function collectAndStoreMetrics() {
  iteration.collectAndStore()
  .catch(error=>
  {
    const detail = error.message || JSON.stringify(error)

    ipc.sendMessage(ERROR_TYPE, detail, {})
  })
}

function programNextIteration() {
  const interval = parameters.intervalBetweenReadings()

  if (interval > 0) {
    timerId = setInterval(collectAndStoreMetrics, interval)
  }
}

function startCollectingMetrics() {
  collectAndStoreMetrics()

  programNextIteration()
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
