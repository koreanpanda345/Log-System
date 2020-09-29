const chalk = require("chalk");
const { existsSync, writeFileSync, readFileSync } = require("fs");
const System = require("./Types/System");
module.exports = class LoggerConfigurations {


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
            error: "Red",
            debug: "Green",
            warn: "Yellow",
            log: "Cyan"
        }

    };

    constructor () {
        if(!existsSync(`${require.main.path}/log-system.config.json`)) {
            let sys = new System();
            const writeToLog = false;

            const logPath = {
                error: `./Logs/error`,
                debug: `./Logs/debug`,
                warn: `./Logs/warn`,
                log: `./Logs/log`
            };
        
            const logPatterns = {
                error: "(<time>) [ <source> ] => <error>",
                debug: "(<time>) [ <source> ] => <debug>",
                warn: "(<time>) [ <source> ] => <warn>",
                log: "(<time>) [ <source> ] => <log>"
            };
        
            const logColors = {
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
            };

            let config = {
    "writeToLog": writeToLog,
    "logPath": logPath,
    "logPatterns": logPatterns,
    "logColors": logColors
};

        writeFileSync(`${require.main.path}/log-system.config.json`, JSON.stringify(config, null, 2), {flag: 'w'});
        }
        let config = readFileSync(`${require.main.path}/log-system.config.json`, {encoding: 'UTF-8'});
        this.configFile = JSON.parse(config);
    }
}