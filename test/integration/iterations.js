/* eslint-env mocha */
/* eslint-disable max-statements, no-magic-numbers */
const assert = require("assert")
const common = require("common-display-module")
const simple = require("simple-mock")

const iteration = require("../../src/iteration")
const iterations = require("../../src/iterations")
const parameters = require("../../src/parameters")
const storing = require("../../src/storing/storing")

describe("Iterations", ()=>
{

  beforeEach(done=>
  {
    const connection = Promise.resolve({})
    const settings = Promise.resolve({displayid: "DIS123"})

    simple.mock(common, "broadcastMessage").returnWith()
    simple.mock(common, "connect").returnWith(connection)
    simple.mock(common, "getDisplaySettings").returnWith(settings)

    // 0 offset, immediate execution
    simple.mock(parameters, "delayForFirstMetric").returnWith(0)
    // 0 interval, do not repeat
    simple.mock(parameters, "intervalBetweenReadings").returnWith(0)

    // watch invocation.
    simple.mock(iteration, "collectAndStore")

    // Set up IPC connection
    storing.init().then(() => done())
  })

  afterEach(()=>
  {
    simple.restore()
  })

  it("should perform an iteration that collects and sends metrics", done =>
  {
    iterations.execute()

    assert.equal(parameters.delayForFirstMetric(), 0)
    assert.equal(parameters.intervalBetweenReadings(), 0)

    function checkMetrics() {
      if (iteration.collectAndStore.called) {
        const promise = iteration.collectAndStore.lastCall.returned

        promise.then(()=>{
          // should have resulted in a ca1ll to logging module
          assert(common.broadcastMessage.called)

          // this is the actual event object sent to the logging module
          const event = common.broadcastMessage.lastCall.args[0]

          // I sent the event
          assert.equal(event.from, "system-metrics")
          // it's a log event
          assert.equal(event.topic, "log")

          const data = event.data
          assert.equal(data.projectName, "client-side-events")
          assert.equal(data.datasetName, "System_Metrics_Events")
          assert.equal(data.table, "events")
          // is this correct ????
          assert.equal(data.failedEntryFile, "sytem-metrics-failed.log")

          // the BigQuery row entry, see design doc for individual element description
          const row = data.data
          assert.equal(row.event, "info")
          assert.equal(row.event_details, "")
          assert.equal(row.display_id, "DIS123")
          // ts will be inserted in logging module, so we won't be checking it here

          // now we check that custom values were sent correctly

          const cpuUsage = row.cpu_usage
          assert(cpuUsage > 0, "Current CPU Load should be greater than 0")
          assert(cpuUsage < 1, "Current CPU Load should be less than 1")

          const freeDisk = row.free_disk
          assert(freeDisk >= 0, "Free disk space should be greater or equal than 0")

          const memoryUsage = row.memory_usage
          assert(memoryUsage > 0, "Memory usage should be greater than 0")
          assert(memoryUsage <= 1, "Memory usage should be less or equal than 1")

          done()
        })
        .catch(error =>
        {
          assert.fail(error)

          done()
        })
      } else {
        setTimeout(checkMetrics, 100)
      }
    }

    checkMetrics()

  })

})
