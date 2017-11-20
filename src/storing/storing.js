// This sub-module is responsible for storing metrics events into BigQuery
// through the logging module.

const ipc = require("../ipc")

const EVENT_TYPE = "data"

/**
 * Send the metrics information through logging module.
 * @param {Object} metrics - The object with the required metrics as described
 * in the design document.
 * @return {void}
 */
function send(metrics) {
  ipc.sendMessage(EVENT_TYPE, "", metrics)
}

module.exports = {send}
