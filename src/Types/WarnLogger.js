/**
 * @summary This is the WarnLogger. This handles everything has to do with warnings.
 * @author Cody Spratford
 * @since 9/29/2020
 */

const chalk = require("chalk");
const moment = require("moment");
const {existsSync, writeFileSync, readFileSync, mkdirSync} = require("fs");
const path = require("path");
/**
 * @class
 * @classdesc This handles all warn logs.
 */
module.exports = class WarnLogger {
    // The warning message
    warn;
    // The source
    source;
    // The pattern to use
    pattern;
    // The colors to use.
    color;
    constructor (warn, pattern = "(<time>) [<source>] => <log>", source = "", color = "") {
        this.warn = warn;
        this.source = source;
        this.pattern = pattern;
        this.color = color;
    }
    /**
     * This will Print to the console.
     */
    printWarn () {
        let message = this.pattern.replace("<time>", moment().format()).replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<warn>", this.warn);
        
        return console.log(this.color.background.startsWith("#") ? chalk[this.color.text].bgHex(this.color.background)(message) : chalk[this.color.text][`bg${this.color.background}`](message));
    }
    /**
     * This will write a log to the filepath provided.
     * @param {string} filepath - the file location.
     */
    WriteWarn (filepath) {
        let message = this.pattern.replace("<time>", moment().format()).replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<warn>", this.warn);
        // if the warn directory doesn't exist, then we will make one.
        if(!existsSync(filepath)) mkdirSync(filepath);
        // if the log file doesn't exist, then we are going to make it.
        if (!existsSync(filepath + "/" + `${new Date(Date.now()).getDate()}.log`)) {
            message = `                                          ------------------------------------------
-----------------------------------------|WARN LOG FILE OF ${moment().format()}|------------------------------------------------
                                          ------------------------------------------
${message}`;
            writeFileSync( filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, message, {flag: 'w'});
        }
        // Else we are going to read the file, then add the logs to it. instead of overwriting the current logs.
        else {
            let data = readFileSync(filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, {encoding: 'UTF-8'});
            writeFileSync(filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, data + "\n" + message, {flag: 'w'});
        }
    }
}