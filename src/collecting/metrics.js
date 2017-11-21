// This is the entry point for the collecting sub-module,
// it combines different metrics into a single data structure for storage and further processing

const cpu = require('./cpu')
const disk = require('./disk')
const memory = require('./memory')

/**
 * Collect all metrics defined for this module and return them as an Object
 * promise. The available properties are documented in the design document
 * for system-metrics-module.
 * @returns {Promise} The promise of an object with properties for each
 * desired metric.
 */
function read() {
  return (
    Promise.all([
      cpu.readSystemWideCurrentLoad(),
      disk.readFreeSpaceInMegaBytes(),
      memory.readSystemWideUsage()
    ])
    .then(results =>
    {
      const [cpuUsage, freeDisk, memoryUsage] = results

      return {
        "cpu_usage": cpuUsage,
        "free_disk": freeDisk,
        "memory_usage": memoryUsage
      }
    })
  )
}

module.exports = {
  read
}
