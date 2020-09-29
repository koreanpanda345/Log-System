/***
 * @summary This is the LoggerConfigurations class. This handles all configurations.
 * @author Cody Spratford
 * @since 9/29/2020
 */

const { existsSync, writeFileSync, readFileSync } = require("fs");
const System = require("./Types/System");
/***
 * @class
 * @classdesc This handles all of the Configurations.
 */
module.exports = class LoggerConfigurations {

    // This is the config defaults.
    configFile = {
        writeToLog: false,
        logPath: {
            error: './Logs/error',
            debug: './Logs/debug',
            warn: './Logs/warn',
            log: './Logs/log'
        },
        logPatterns: {
            error: "(<time>) [ <source> ] => <error>",
            debug: "(<time>) [ <source> ] => <debug>",
            warn: "(<time>) [ <source> ] => <warn>",
            log: "(<time>) [ <source> ] => <log>"
        },
        logColors: {
            error: {
                text: "black",
                background: "Red"
            },
            debug: {
                text: "black",
                background: "Green"
            },
            warn: {
                text: "black",
                background: "Yellow"
            },
            log: {
                text: "black",
                background: "Cyan"
            }
        }

    };

    constructor () {
        // Checks if the cwd has a log-sys.config.json, if not then we are going to make one.
        if(!existsSync(`${require.main.path}/log-system.config.json`)) {
            // This will write the Name, and say thank you for using Log System.
            new System();
            
            writeFileSync(`${require.main.path}/log-system.config.json`, JSON.stringify(this.configFile, null, 2), {flag: 'w'});
        }
        // We are going to read the config.json file, and pass it into the configFile.
        let config = readFileSync(`${require.main.path}/log-system.config.json`, {encoding: 'UTF-8'});
        this.configFile = JSON.parse(config);
    }
}