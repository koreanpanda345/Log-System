const chalk = require("chalk");
const moment = require("moment");
const {existsSync, writeFileSync, readFileSync, mkdirSync} = require("fs");
const path = require("path");
module.exports = class DebugLogger {
    debug;
    source;
    pattern;
    color;
    timePattern;
    constructor (debug, pattern = "(<time>) [<source>] => <log>", source = "", color = "", timePattern) {
        this.debug = debug;
        this.source = source;
        this.pattern = pattern;
        this.color = color;
        this.timePattern = timePattern;
    }

    printDebug () {
        let message = this.pattern
            .replace("<time>", moment().format(this.timePattern))
            .replace("<source>", this.source)
            .replace("<source-short>", path.basename(this.source))
            .replace("<debug>", this.debug);
        if(message.includes("<color>"))
            return console.log(`${message.split("<color>")[0]}${this.color.background.startsWith("#") ? chalk[this.color.text].bgHex(this.color.background)(message.split("<color>")[1].split("</color>")[0]) : chalk[this.color.text][`bg${this.color.background}`](message.split("<color>")[1].split("</color>")[0])}${message.split("</color>")[1]}`);
        return console.log(this.color.background.startsWith("#") ? chalk[this.color.text].bgHex(this.color.background)(message) : chalk[this.color.text][`bg${this.color.background}`](message));
    }

    WriteDebug (filepath) {
        let message = this.pattern.replace("<time>", moment().format(this.timePattern)).replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<debug>", this.debug);
        if(!existsSync(filepath)) mkdirSync(filepath);
        if (!existsSync(filepath + "/" + `${new Date(Date.now()).getDate()}.log`)) {
            message = `                                          -------------------------------------------
-----------------------------------------|DEBUG LOG FILE OF ${moment().format()}|------------------------------------------------
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