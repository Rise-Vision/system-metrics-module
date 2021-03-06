/* eslint-env mocha */
/* eslint-disable max-statements */
const assert = require("assert")
const metrics = require("../../../src/collecting/metrics")
const cpu = require("../../../src/collecting/cpu")
const disk = require("../../../src/collecting/disk")
const memory = require("../../../src/collecting/memory")

describe("Collecting - Unit", ()=>
{

  function validateMemoryUsage(value) {
    assert(value > 0, "Memory usage should be greater than 0")
    assert(value <= 1, "Memory usage should be less or equal than 1")
  }

  function validateCpuUsage(value) {
    assert(value > 0, "Current CPU Load should be greater than 0")
    assert(value < 1, "Current CPU Load should be less than 1")
  }

  function validateFreeDisk(value) {
    assert(value >= 0, "Free disk space should be greater or equal than 0")
  }

  it("should read memory usage", () =>
  {
    return memory.readSystemWideUsage()
    .then(value =>
    {
      validateMemoryUsage(value)
    })
  })

  it("should read current CPU load", () =>
  {
    return cpu.readSystemWideCurrentLoad()
    .then(value =>
    {
      validateCpuUsage(value)
    })
  })

  it("should read free disk space", () =>
  {
    return disk.readFreeSpaceInMegaBytes()
    .then(value =>
    {
      validateFreeDisk(value)
    })
  })

  it("should read all metrics and return them as a single object", () =>
  {
    return metrics.read()
    .then(entry =>
    {
      validateMemoryUsage(entry.memory_usage)
      validateCpuUsage(entry.cpu_usage)
      validateFreeDisk(entry.free_disk)
    })
  })

})
