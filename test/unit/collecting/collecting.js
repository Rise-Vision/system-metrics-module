/* eslint-env mocha */
/* eslint-disable max-statements */
const assert = require("assert")
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

})
