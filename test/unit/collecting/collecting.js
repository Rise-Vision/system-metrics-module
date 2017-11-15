/* eslint-env mocha */
/* eslint-disable max-statements */
const assert = require("assert")
const cpu = require("../../../src/collecting/cpu")
const memory = require("../../../src/collecting/memory")

describe("Collecting", ()=>
{

  it("should read memory usage", done =>
  {
    memory.readSystemWideUsage()
    .then(value =>
    {
      assert(value > 0, "Memory usage should be greater than 0")
      assert(value <= 1, "Memory usage should be less or equal than 1")

      done()
    })
  })

  it("should read current CPU load", done =>
  {
    cpu.readSystemWideCurrentCPULoad()
    .then(value =>
    {
      assert(value > 0, "Current CPU Load should be greater than 0")
      assert(value < 1, "Current CPU Load should be less than 1")

      done()
    })
  })

})
