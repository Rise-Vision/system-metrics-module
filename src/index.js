const storing = require("./storing/storing")
const iterations = require("./iterations")

// main module loop, the IPC connection is created, and iterations programmed
storing.init()
.then(iterations.execute)
