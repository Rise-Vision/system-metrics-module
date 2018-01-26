const messaging = require("common-display-module/messaging")
const logging = require("./logging")
const moduleName = require("./parameters").moduleName()

function connect() {
  return logging.loadDisplaySettings()
  .then(() => messaging.connect(moduleName))
}

module.exports = {connect}
