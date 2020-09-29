# LogSystem
LogSystem is a Logging package that can not only print to the console in how you want it to be exactly for any of the types, but it can also Write Logs, to make it easier for those that need a log system, but don't know where to start. It is super simple, and easy to setup. Highly Customizable, down to the single character.


## Installing LogSystem
If you are using npm:
```
$ npm i @koreanpanda/log-system --save
```
If you are using yarn:
```
$ yarn add @koreanpanda/log-system
```
## To Initalize The Logger

```js
const LogSystem = require("log-sys");
const logger = new LogSystem();
```

when you run the code for the first time a file called `log-system.config.json` will be made in your root directory of your project. This file will be how you customize the Logger.

## Log Patterns
 Log Patterns are how you can structure the logs. You basically provide the template that you wish it to use, and let it do the rest. there are placeholders like time, and source. It defers on what log pattern it is for.

 ```json
 "logPatterns": {
     "error": "(<time>) [<type>] => {<source-short>}: <error>"
 }
 ```

 ## Log Colors
 Log Colors is the color background and text you wish the logger to use for which type. Type the color you wish to use.
```json
"logColors": {
    "error": {
        "text": "black",
        "background": "#d44631"
    }
}
```

## How do I make it write logs?
in the config file, there is a key called `writeToLog`, make these true to enable it to create Logs. Make sure you have the base folder created for the Logger, so it knows where you wish to keep the log files.

## Log Paths
Log paths are the directory of where you wish the logs to go to. by default it requires a folder called Logs made for it.

```json
"logPaths": {
    "error": "./Logs/error"
}
```

