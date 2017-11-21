const common = require("common-display-module")
const logging = require("./logging")
const moduleName = require("./parameters").moduleName()

function connect() {
  return logging.loadDisplaySettings()
  .then(() => common.connect(moduleName))
}

module.exports = {connect}
