/**
 * @summary This is the LogLogger. This handles everything has to do with default logs.
 * @author Cody Spratford
 * @since 9/29/2020
 */

const chalk = require("chalk");
const moment = require("moment");
const {existsSync, writeFileSync, readFileSync, mkdirSync} = require("fs");
const path = require("path");
/**
 * @class
 * @classdesc This class handles all default log messages.
 */
module.exports = class LogLogger {
    // The log message.
    log;
    // The Source.
    source;
    // The Pattern.
    pattern;
    // The color.
    color;
    constructor (log, pattern = "(<time>) [<source>] => <log>", source = "", color) {
        this.log = log;
        this.source = source;
        this.pattern = pattern;
        this.color = color;
    }
    /**
     * This prints the default log messages to the console.
     */
    printLog () {
        let message = this.pattern.replace("<time>", moment().format()).replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<log>", this.log);
        
        return console.log(this.color.background.startsWith("#") ? chalk[this.color.text].bgHex(this.color.background)(message) : chalk[this.color.text][`bg${this.color.background}`](message));
    }
    /**
     * This will write to the provided filepath.
     * @param {string} filepath 
     */
    WriteLog (filepath) {
        let message = this.pattern.replace("<time>", moment().format()).replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<log>", this.log);
        if(!existsSync(filepath)) mkdirSync(filepath);
        if (!existsSync(filepath + "/" + `${new Date(Date.now()).getDate()}.log`)) {
            message = `                                          -------------------------------------
-----------------------------------------|LOG FILE OF ${moment().format()}|------------------------------------------------
                                          -------------------------------------
${message}`;
            writeFileSync( filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, message, {flag: 'w'});
        }

        else {
            let data = readFileSync(filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, {encoding: 'UTF-8'});
            writeFileSync(filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, data + "\n" + message, {flag: 'w'});
        }
    }
}