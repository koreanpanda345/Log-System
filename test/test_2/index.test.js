const LogSystem = require("../../src/Logger");

const logger = new LogSystem();

const { existsSync } = require("fs");

console.log('Test Case Number 2 - Writng Logs');
console.log('Testing Log Method');
logger.log('This is a log message');
logger.log('This should be logged in the log file.');
logger.log('testing 1.. 2.. 3..');
console.log('Should make file.');
if (!existsSync("./test/test_2/Logs/log")) return console.error("Test Failed - log folder doesn't exist.");