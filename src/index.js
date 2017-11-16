const iteration = require("./iteration")
const {interval, offset} = require("./parameters")
const storing = require("./storing/storing")

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
 * Start the metrics collection process. Performs a first collecting task,
 * and programs the next ones.
 * @returns {void}
 */
function startCollectingMetrics() {
  collectAndStoreMetrics()

  setInterval(collectAndStoreMetrics, interval)
}

// main module loop, the IPC connection is created, and iterations programmed
storing.init()
.then(()=>
{
  if (offset === 0) {
    startCollectingMetrics()
  } else {
    setTimeout(startCollectingMetrics, offset)
  }
})
