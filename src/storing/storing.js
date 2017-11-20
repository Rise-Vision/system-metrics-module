// This sub-module is responsible for storing metrics events into BigQuery
// through the logging module.

const logging = require("../logging")

const EVENT_TYPE = "data"

/**
 * @param {Object} metrics - The object with the required metrics as described
 * in the design document.
 * @return {void}
 */
function send(metrics) {
  logging.send(EVENT_TYPE, "", metrics)
}

module.exports = {send}
