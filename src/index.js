const ipc = require("./ipc");
const iterations = require("./iterations");
const heartbeat = require("common-display-module/heartbeat");
const logging = require("./logging");
const moduleName = require("./parameters").moduleName();

// main module loop
ipc.connect()
.then(iterations.execute)
.then(heartbeat.startHeartbeatInterval(moduleName))
.then(() => logging.all("started"));
