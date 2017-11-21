const os = require('os')

/**
 * Reads system memory usage and return it as a promise, so we can change
 * sync/async implementations if needed.
 * @returns {Promise} Memory as a 0 to 1 value that represents used
 * memory / total memory
 */
function readSystemWideUsage() {
  const total = os.totalmem()
  const free = os.freemem()
  const usage = (total - free) / total

  return Promise.resolve(usage)
}

module.exports = {
  readSystemWideUsage
}
