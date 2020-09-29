const chalk = require("chalk");
const moment = require("moment");
const {existsSync, writeFileSync, readFileSync, mkdirSync} = require("fs");
const path = require("path");
module.exports = class WarnLogger {
    warn;
    source;
    pattern;
    color;
    constructor (warn, pattern = "(<time>) [<source>] => <log>", source = "", color = "") {
        this.warn = warn;
        this.source = source;
        this.pattern = pattern;
        this.color = color;
    }

    printWarn () {
        let message = this.pattern.replace("<time>", moment().format()).replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<warn>", this.warn);
        
        return console.log(this.color.background.startsWith("#") ? chalk[this.color.text].bgHex(this.color.background)(message) : chalk[this.color.text][`bg${this.color.background}`](message));
    }

    WriteWarn (filepath) {
        let message = this.pattern.replace("<time>", moment().format()).replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<warn>", this.warn);
        if(!existsSync(filepath)) mkdirSync(filepath);
        if (!existsSync(filepath + "/" + `${new Date(Date.now()).getDate()}.log`)) {
            message = `                                          ------------------------------------------
-----------------------------------------|WARN LOG FILE OF ${moment().format()}|------------------------------------------------
                                          ------------------------------------------
${message}`;
            writeFileSync( filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, message, {flag: 'w'});
        }

        else {
            let data = readFileSync(filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, {encoding: 'UTF-8'});
            writeFileSync(filepath+ "/" + `${new Date(Date.now()).getDate()}.log`, data + "\n" + message, {flag: 'w'});
        }
    }
}