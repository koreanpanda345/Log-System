const LogSystem = require("../../src/Logger");
const { existsSync } = require("fs");
const logger = new LogSystem();
const {writeSomething} = require("./src/test");
console.log('Test Case Number 3 -  Multiple Files');
console.log('Should only make one config file for this test.');
logger.log("Something");

writeSomething();

if(existsSync('./test/test_3/src/index.test.js')) return console.error('Test Failed. log-system.config.js does exist in the src folder.');
console.log('Test was Successful');
