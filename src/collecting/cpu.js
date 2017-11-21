const info = require('systeminformation')

const PERCENT = 100

/**
 * Reads system-wide CPU usage as a percentage and return it as a promise,
 * so we can change sync/async implementations if needed.
 * @returns {Promise} Current CPU load as a 0 to 1 value that represents
 * overall CPU usage for the current Operating System.
 */
function readSystemWideCurrentLoad() {
  return info.currentLoad()
  .then(data => data.currentload / PERCENT)
}

module.exports = {
  readSystemWideCurrentLoad
}
