/* eslint-env mocha */
/* eslint-disable max-statements, no-magic-numbers, no-plusplus */
const assert = require("assert")
const simple = require("simple-mock")

const iteration = require("../../src/iteration")
const iterations = require("../../src/iterations")
const parameters = require("../../src/parameters")

describe("Iterations - Unit", ()=>
{

  const completed = Promise.resolve(true)
  let counter = 0
  let promise = null

  afterEach(()=>
  {
    iterations.stop()
    simple.restore()
    counter = 0
    promise = null
  })

  describe("Multiple iterations", ()=>
  {

    beforeEach(()=>
    {
      let reached = null
      promise = new Promise(resolved => {
        reached = resolved
      })

      // emulate collect.
      simple.mock(iteration, "collectAndStore").callFn(()=>
      {
        counter++

        if (counter >= 10) {
          reached(true)
        }

        return completed
      })
    })

    it("should iterate 10 times with no offset", done =>
    {
      // 0 offset, no wait
      simple.mock(parameters, "delayForFirstMetric").returnWith(0)
      // 100 interval, quick repeat
      simple.mock(parameters, "intervalBetweenReadings").returnWith(100)

      iterations.execute()

      promise.then(() =>
      {
        assert(counter >= 10)

        done()
      })
      .catch(error =>
      {
        assert.fail(error)

        done()
      })
    })

    it("should iterate 10 times with offset", done =>
    {
      // 10 offset, tiny wait
      simple.mock(parameters, "delayForFirstMetric").returnWith(10)
      // 100 interval, quick repeat
      simple.mock(parameters, "intervalBetweenReadings").returnWith(100)

      iterations.execute()

      promise.then(() =>
      {
        assert(counter >= 10)

        done()
      })
      .catch(error =>
      {
        assert.fail(error)

        done()
      })
    })

  })

  // This is used on integration tests, not at runtime.
  describe("Single iteration", ()=>
  {

    beforeEach(()=>
    {
      let reached = null
      promise = new Promise(resolved => {
        reached = resolved
      })

      // emulate collect.
      simple.mock(iteration, "collectAndStore").callFn(()=>
      {
        counter = 1
        reached(true)

        return completed
      })
    })

    it("should collect a single time", done =>
    {
      // 0 offset, no wait
      simple.mock(parameters, "delayForFirstMetric").returnWith(0)
      // 0 interval, no repeat
      simple.mock(parameters, "intervalBetweenReadings").returnWith(0)

      iterations.execute()

      promise.then(() =>
      {
        assert.equal(counter, 1)

        done()
      })
      .catch(error =>
      {
        assert.fail(error)

        done()
      })
    })

  })

})
