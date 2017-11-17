// This sub-module is responsible for storing metrics events into BigQuery
// through the logging module.

const common = require("common-display-module")
const logging = require("common-display-module/external-logger")

const EVENT_TYPE = "info"
const MODULE_NAME = "system-metrics"

const BQ_PROJECT_NAME = "client-side-events"
const BQ_DATASET = "System_Metrics_Events"
const BQ_TABLE = "events"

const FAILED_ENTRY_FILE = "sytem-metrics-failed.log"

const logger = logging(BQ_PROJECT_NAME, BQ_DATASET, FAILED_ENTRY_FILE)

// display id
let displayId = null

/**
 * Creates the connection to the IPC channel.
 * @returns {Promise} The IPC connection promise.
 */
function init() {
  return common.getDisplaySettings()
  .then(settings =>
  {
    displayId = settings.displayid || settings.tempdisplayid

    if (displayId === null) {
      throw new Error('Display ID not found. Perhaps module is not properly configured ?')
    }

    return common.connect(MODULE_NAME)
  })
}

/**
 * Send the metrics information through logging module.
 * @param {Object} metrics - The object with the required metrics as described
 * in the design document.
 * @return {void}
 */
function send(metrics) {
  if (displayId === null) {
    throw new Error('Display ID not initialized. Perhaps init() method was not called ?')
  }

  const detail = Object.assign({}, metrics, {
    "event_details": "",
    "display_id": displayId
  })

  logger.log(EVENT_TYPE, detail, BQ_TABLE, MODULE_NAME)
}

module.exports = {init, send}
