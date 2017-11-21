const common = require("common-display-module")
const moduleName = require("./parameters").moduleName()

const BQ_PROJECT_NAME = "client-side-events"
const BQ_DATASET = "System_Metrics_Events"
const BQ_TABLE = "events"

const logFolder = common.getModulePath(moduleName)
const FAILED_ENTRY_FILE = "system-metrics-failed.log"

const externalLogger = require("common-display-module/external-logger")(BQ_PROJECT_NAME, BQ_DATASET, FAILED_ENTRY_FILE)
const logger = require("rise-common-electron/logger")(externalLogger, logFolder, moduleName)

/**
 * This is the type of event that will be used for storing metrics in BQ,
 * so it won't confuse with other logging events ( error, info, etc. )
 */
const DATA_EVENT_TYPE = "data"

let displayId = null

function loadDisplaySettings() {
  return common.getDisplaySettings()
  .then(settings =>
  {
    displayId = settings.displayid || settings.tempdisplayid

    if (displayId === null) {
      throw new Error('Display ID not found. Perhaps module is not properly configured ?')
    }
  })
}

// Creates the detail data structure that the logging functions expect.
// Assigns "event_details" and "display_id", that are expected in the events table
function detailsFor(eventDetails, data) {
  if (displayId === null) {
    throw new Error('Display ID not initialized. Perhaps loadDisplaySettings() method was not called ?')
  }

  return Object.assign({
    "event_details": eventDetails,
    "display_id": displayId
  }, data)
}

function error(eventDetails, userFriendlyMessage) {
  const detail = detailsFor(eventDetails, {})

  logger.error(detail, userFriendlyMessage, BQ_TABLE)
}

function send(eventType, eventDetails, data) {
  const detail = detailsFor(eventDetails, data)

  logger.external(eventType, detail, BQ_TABLE)
}

/**
 * @param {Object} metrics - The object with the required metrics as described
 * in the design document.
 * @return {void}
 */
function sendMetrics(metrics) {
  send(DATA_EVENT_TYPE, "", metrics)
}

module.exports = {error, loadDisplaySettings, send, sendMetrics}
