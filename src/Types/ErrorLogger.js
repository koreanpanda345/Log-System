/**
 * @summary This is the ErrorLogger. This handles everything has to do with Errors.
 * @author Cody Spratford
 * @since 9/29/2020
 */

const chalk = require("chalk");
const moment = require("moment");
const {existsSync, writeFileSync, readFileSync, mkdirSync} = require("fs");
const path = require("path");
/**
 * This handles all error messages.
 */
module.exports = class ErrorLogger {
    // The Error Message.
    error;
    // The Source.
    source;
    // The Pattern.
    pattern;
    // The Color.
    color;
    // Time Pattern.
    timePattern;
    constructor (error, pattern = "(<time>) [<source>] => <error>", source = "", color = "", timePattern) {
        this.error = error;
        this.source = source;
        this.pattern = pattern;
        this.color = color;
        this.timePattern = timePattern;
    }
    /**
     * This prints to the console.
     * @param {string} type - Type of error.
     */
    printError (type = "ERROR") {
        let message = this.pattern
                            .replace("<time>", moment().format(this.timePattern))
                            .replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<error>", this.error)
                            .replace("<type>", type);
                            if(message.includes("<color>"))
                                return console.log(`${message.split("<color>")[0]}${this.color.background.startsWith("#") ? chalk[this.color.text].bgHex(this.color.background)(message.split("<color>")[1].split("</color>")[0]) : chalk[this.color.text][`bg${this.color.background}`](message.split("<color>")[1].split("</color>")[0])}${message.split("</color>")[1]}`);
                            return console.log(this.color.background.startsWith("#") ? chalk[this.color.text].bgHex(this.color.background)(message) : chalk[this.color.text][`bg${this.color.background}`](message));
    }
    /**
     * This writes the error logs to the provided filepath.
     * @param {string} filepath - The File location to write to.
     * @param {string} type - Type of Error.
     */
    WriteError (filepath, type = "ERROR") {
        let message = this.pattern
                            .replace("<time>", moment().format(this.timePattern))
                            .replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<error>", this.error)
                            .replace("<type>", type);

        if(!existsSync(filepath)) mkdirSync(filepath);
        if (!existsSync(filepath + "/" + `${new Date(Date.now()).getDate()}.log`)) {
            message = `                                          -------------------------------------------
-----------------------------------------|ERROR LOG FILE OF ${moment().format()}|------------------------------------------------
                                          -------------------------------------------
${message}`;
            writeFileSync( filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, message, {flag: 'w'});
        }

        else {
            let data = readFileSync(filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, {encoding: 'UTF-8'});
            writeFileSync(filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, data + "\n" + message, {flag: 'w'});
        }
    }
}