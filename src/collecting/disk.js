const {platform} = require("common-display-module")

// sometimes disk metrics use 1000 instead of 1024, but common function uses 1024 so we stick to that
const KILOBYTES = 1024
const MEGABYTES = KILOBYTES * KILOBYTES

/**
 * Reads free disk space in bytes. This is a thin wrapper around the
 * common getFreeDiskSpace() function. The value is returned as a promise,
 * so we can change sync/async implementations if needed.
 * In windows this will be the free space for the player's drive; in
 * Linux this will be the free space for the player's filesystem.
 * @returns {Promise} Free disk space in bytes as an integer value.
 */
function readFreeSpaceInBytes() {
  return platform.getFreeDiskSpace()
}

/**
 * Reads free disk space in megabytes.
 * @see readFreeSpaceInBytes
 * @returns {Promise} Free disk space in megabytes as an integer value.
 */
function readFreeSpaceInMegaBytes() {
  return readFreeSpaceInBytes()
  .then(data => Math.trunc(data / MEGABYTES))
}

module.exports = {
  readFreeSpaceInBytes,
  readFreeSpaceInMegaBytes
}
