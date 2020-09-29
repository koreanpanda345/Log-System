const chalk = require("chalk");
const moment = require("moment");
const {existsSync, writeFileSync, readFileSync, mkdirSync} = require("fs");
const path = require("path");
module.exports = class ErrorLogger {
    error;
    source;
    pattern;
    color;
    constructor (error, pattern = "(<time>) [<source>] => <error>", source = "", color = "") {
        this.error = error;
        this.source = source;
        this.pattern = pattern;
        this.color = color;
    }

    printError (type = "ERROR") {
        let message = this.pattern
                            .replace("<time>", moment().format())
                            .replace("<source>", this.source).replace("<source-short>", path.basename(this.source)).replace("<error>", this.error)
                            .replace("<type>", type);
        
                            return console.log(this.color.background.startsWith("#") ? chalk[this.color.text].bgHex(this.color.background)(message) : chalk[this.color.text][`bg${this.color.background}`](message));
    }

    WriteError (filepath, type = "ERROR") {
        let message = this.pattern
                            .replace("<time>", moment().format())
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