const LogSystem = require("../../../src/Logger");

const logger = new LogSystem();

console.log('Should not make a config file in this folder.');

module.exports = {
    writeSomething() {
        logger.log("Something");
    }
}