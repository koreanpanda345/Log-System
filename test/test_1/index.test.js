/**
 * This is Test Case Number 1
 * This is using default settings.
 */

const LogSystem = require("../../src/Logger");
const logger = new LogSystem();

const {existsSync} = require("fs");
console.log('Test Case Number 1 - Default Settings');
console.log("Display Test messages");
logger.log("This is a log message");
logger.error("This is a error message");
logger.warn("This is a warn message");
logger.debug("This is a debug message");

console.log("Should not make any logs.");

if(existsSync("./test/test_1/Logs/error")) return console.error("Test Failed");