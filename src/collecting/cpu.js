const info = require('systeminformation')

const PERCENT = 100

/**
 * Reads system-wide CPU usage as a percentage and return it as a promise,
 * so we can change sync/async implementations if needed.
 * @returns {number} Current CPU load as a 0 to 1 value that represents
 * overall CPU usage for the current Operating System.
 */
function readSystemWideCurrentCPULoad() {
  return info.currentLoad()
  .then(data => data.currentload / PERCENT)
}

module.exports = {
  readSystemWideCurrentCPULoad
}
