/* eslint-env mocha */
/* eslint-disable max-statements */
const assert = require("assert")
const common = require("common-display-module")
const messaging = require("common-display-module/messaging")
const simple = require("simple-mock")

const ipc = require("../../src/ipc")
const logging = require("../../src/logging")

describe("Logging - Unit", ()=>
{

  beforeEach(done=>
  {
    const connection = Promise.resolve({})
    const settings = Promise.resolve({displayid: "DIS123"})

    simple.mock(messaging, "broadcastMessage").returnWith()
    simple.mock(messaging, "connect").returnWith(connection)
    simple.mock(common, "getDisplaySettings").returnWith(settings)

    ipc.connect().then(() => done())
  })

  afterEach(()=>
  {
    simple.restore()
  })

  it("should send metrics to logging module", () =>
  {
    const sampleMetrics = {
      "cpu_usage": 0.4, "free_disk": 400, "memory_usage": 0.2
    }

    logging.sendMetrics(sampleMetrics)

    // should have resulted in a call to logging module
    assert(messaging.broadcastMessage.called)

    // this is the actual event object sent to the logging module
    const event = messaging.broadcastMessage.lastCall.args[0]

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
    assert.equal(row.cpu_usage, sampleMetrics.cpu_usage)
    assert.equal(row.free_disk, sampleMetrics.free_disk)
    assert.equal(row.memory_usage, sampleMetrics.memory_usage)
  })

})
