/**
 * @summary This is the logger class. this class is the class that people will require.
 * @author Cody Spratford
 * @since 9/29/2020
 */

const LoggerConfigurations = require("./LoggerConfigurations");
const ErrorLogger = require("./Types/ErrorLogger");
const LogLogger = require("./Types/LogLogger");
const {writeFileSync, readFileSync} = require("fs");
const WarnLogger = require("./Types/WarnLogger");
const DebugLogger = require("./Types/DebugLogger");
/**
 * @class
 * @classdesc This class is the class that will be required, and handles all the user methods.
 */
module.exports = class Logger {
    /**
     * This is the configurations. this will be holding the config options.
     * @type {LoggerConfigurations}
     */
    config;
    /**
     * Doesn't require the config parameter, but it is ther if you wish to use it.
     * @param {LoggerConfigurations} config 
     */
    constructor (config = new LoggerConfigurations()) {
        this.config = config;
        // If the program exits, then it will put a line break in the logs.
        process.on('exit', (code) => {
            if (this.config.configFile.writeToLog) {
            // Error Logs
            let data = readFileSync(this.config.configFile.logPath.error + "/" + `${new Date(Date.now()).getDate()}.log`, {encoding: 'UTF-8'});
            writeFileSync(this.config.configFile.logPath.error + "/" + `${new Date(Date.now()).getDate()}.log`, data + "\n" + "------------------------------------------------------------------------------------------------------------", {flag: 'w'});
            // Log Logs
            let _data = readFileSync(this.config.configFile.logPath.log + "/" + `${new Date(Date.now()).getDate()}.log`, {encoding: 'UTF-8'});
            writeFileSync(this.config.configFile.logPath.log + "/" + `${new Date(Date.now()).getDate()}.log`, _data + "\n" + "------------------------------------------------------------------------------------------------------------", {flag: 'w'});
            // Warn Logs 
            let __data = readFileSync(this.config.configFile.logPath.warn + "/" + `${new Date(Date.now()).getDate()}.log`, {encoding: 'UTF-8'});
            writeFileSync(this.config.configFile.logPath.warn + "/" + `${new Date(Date.now()).getDate()}.log`, __data + "\n" + "------------------------------------------------------------------------------------------------------------", {flag: 'w'});
            // Debug Logs
            let ___data = readFileSync(this.config.configFile.logPath.debug + "/" + `${new Date(Date.now()).getDate()}.log`, {encoding: 'UTF-8'});
            writeFileSync(this.config.configFile.logPath.debug + "/" + `${new Date(Date.now()).getDate()}.log`, ___data + "\n" + "------------------------------------------------------------------------------------------------------------", {flag: 'w'});
            }
        });
    }
    /**
     * This is to log errors.
     * @param {any} _error - error message.
     * @param {string} type - type of error.
     */
    error (_error, type = "ERROR") {
        const error = new ErrorLogger(_error, this.config.configFile.logPatterns.error, `${require.main.filename}`, this.config.configFile.logColors.error)
        // if the config.writeToLog is true, then it will write logs.
        if (this.config.configFile.writeToLog) {
            error.WriteError(this.config.configFile.logPath.error, type);
            error.printError(type);
        }
        // If not, then just print to the console.
        else {
            error.printError(type);
        }
    }
    /**
     * This is to log messages.
     * @param {any} message - the log message.
     */
    log (message) {
        const log = new LogLogger(message, this.config.configFile.logPatterns.log, `${require.main.filename}`, this.config.configFile.logColors.log);
        // if the config.writeToLog is true, then it will write logs.
        if (this.config.configFile.writeToLog) {
            log.WriteLog(this.config.configFile.logPath.log);
            log.printLog();
        }
        else {
            log.printLog();
        }
    }
    /**
     * This is to log warnings.
     * @param {any} warning - the warning message.
     */
    warn (warning) {
        const warn = new WarnLogger(warning, this.config.configFile.logPatterns.warn, `${require.main.filename}`, this.config.configFile.logColors.warn);
        // if the config.writeToLog is true, then it will write logs.
        if (this.config.configFile.writeToLog) {
            warn.WriteWarn(this.config.configFile.logPath.warn);
            warn.printWarn();
        }
        // If not, then just print to the console.
        else {
            warn.printWarn();
        }
    }
    /**
     * This is to Log debugs.
     * @param {any} debug - the debug message.
     */
    debug (debug) {
        const _debug = new DebugLogger(debug, this.config.configFile.logPatterns.debug, `${require.main.filename}`, this.config.configFile.logColors.debug);
        // if the config.writeToLog is true, then it will write logs.
        if (this.config.configFile.writeToLog) {
            _debug.WriteDebug(this.config.configFile.logPath.debug);
            _debug.printDebug();
        }
        // If not, then just print to the console.
        else {
            _debug.printDebug();
        }
    }
}

