/* eslint-env mocha */
/* eslint-disable max-statements */
const assert = require("assert")
const common = require("common-display-module")
const simple = require("simple-mock")

const ipc = require("../../src/ipc")
const iteration = require("../../src/iteration")

describe("Integration Iteration", ()=>
{

  beforeEach(done=>
  {
    const connection = Promise.resolve({})
    const settings = Promise.resolve({displayid: "DIS123"})

    simple.mock(common, "broadcastMessage").returnWith()
    simple.mock(common, "connect").returnWith(connection)
    simple.mock(common, "getDisplaySettings").returnWith(settings)

    // Set up IPC connection
    ipc.connect().then(() => done())
  })

  afterEach(()=>
  {
    simple.restore()
  })

  it("should collect and send metrics data to logging module", done =>
  {
    iteration.collectAndStore().then(()=>{
      // should have resulted in a call to logging module
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
      assert.equal(data.failedEntryFile, "system-metrics-failed.log")

      // the BigQuery row entry, see design doc for individual element description
      const row = data.data
      assert.equal(row.event, "data")
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
  })

})
