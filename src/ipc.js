// Connection and messaging functions related to the local IPC communication.

const common = require("common-display-module")
const logging = require("common-display-module/external-logger")

const MODULE_NAME = "system-metrics"

const BQ_PROJECT_NAME = "client-side-events"
const BQ_DATASET = "System_Metrics_Events"
const BQ_TABLE = "events"

const FAILED_ENTRY_FILE = "sytem-metrics-failed.log"

const logger = logging(BQ_PROJECT_NAME, BQ_DATASET, FAILED_ENTRY_FILE)

let displayId = null

/**
 * Creates the connection to the IPC channel, and also references the display
 * id in a local variable.
 * @returns {Promise} The IPC connection promise.
 */
function connect() {
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

function sendMessage(eventType, eventDetails, data) {
  if (displayId === null) {
    throw new Error('Display ID not initialized. Perhaps init() method was not called ?')
  }

  const detail = Object.assign({}, data, {
    "event_details": eventDetails,
    "display_id": displayId
  })

  logger.log(eventType, detail, BQ_TABLE, MODULE_NAME)
}

module.exports = {connect, sendMessage}
