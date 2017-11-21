const ipc = require("./ipc")
const iterations = require("./iterations")

// main module loop
ipc.connect()
.then(iterations.execute)
