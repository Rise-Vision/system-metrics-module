const ipc = require("./ipc");
const iterations = require("./iterations");
const heartbeat = require("common-display-module/heartbeat");
const moduleName = require("./parameters").moduleName();

// main module loop
ipc.connect()
.then(iterations.execute)
.then(heartbeat.startHearbeatInterval(moduleName));
