const LoggerConfigurations = require("./LoggerConfigurations");
const ErrorLogger = require("./Types/ErrorLogger");
const LogLogger = require("./Types/LogLogger");
const {writeFileSync, readFileSync} = require("fs");
const WarnLogger = require("./Types/WarnLogger");
const DebugLogger = require("./Types/DebugLogger");
module.exports = class Logger {
    /**
     * @type {LoggerConfigurations}
     */
    config;
    /**
     * 
     * @param {LoggerConfigurations} config 
     */
    constructor (config = new LoggerConfigurations()) {
        this.config = config;
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

    error (_error, type = "ERROR") {
        const error = new ErrorLogger(_error, this.config.configFile.logPatterns.error, `${require.main.filename}`, this.config.configFile.logColors.error)
        if (this.config.configFile.writeToLog) {
            error.WriteError(this.config.configFile.logPath.error, type);
            error.printError(type);
        }
        else {
            error.printError(type);
        }
    }

    log (message) {
        const log = new LogLogger(message, this.config.configFile.logPatterns.log, `${require.main.filename}`, this.config.configFile.logColors.log);
        if (this.config.configFile.writeToLog) {
            log.WriteLog(this.config.configFile.logPath.log);
            log.printLog();
        }
        else {
            log.printLog();
        }
    }

    warn (warning) {
        const warn = new WarnLogger(warning, this.config.configFile.logPatterns.warn, `${require.main.filename}`, this.config.configFile.logColors.warn);
        if (this.config.configFile.writeToLog) {
            warn.WriteWarn(this.config.configFile.logPath.warn);
            warn.printWarn();
        }
        else {
            warn.printWarn();
        }
    }

    debug (debug) {
        const _debug = new DebugLogger(debug, this.config.configFile.logPatterns.debug, `${require.main.filename}`, this.config.configFile.logColors.debug);
        if (this.config.configFile.writeToLog) {
            _debug.WriteDebug(this.config.configFile.logPath.debug);
            _debug.printDebug();
        }
        else {
            _debug.printDebug();
        }
    }

}

