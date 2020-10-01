# LogSystem
[![npm](https://img.shields.io/npm/v/github-buttons)](https://www.npmjs.com/package/@koreanpanda/log-system/v/1.0.0)

LogSystem is a Logging package that can not only print to the console in how you want it to be exactly for any of the types, but it can also Write Logs, to make it easier for those that need a log system, but don't know where to start. It is super simple, and easy to setup. Highly Customizable, down to the single character.

# Note:
When a new version comes out, make sure you update the package by using `npm update` if you are using npm as your package manager, or `yarn update`, if you are using yarn. Then run your program. The package was built to add anything new to the config if it needs to, when it runs.

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
const LogSystem = require("@koreanpanda/log-system");
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
 Log Colors is the color background and text you wish the logger to use for which type. Type the color you wish to use. Only background for now supports hex colors. and this is using `chalk` so text color should be lowercased like `black`, and if you want to use preset colors that chalk provides it should be proper case like `Black`.
```json
"logColors": {
    "error": {
        "text": "black",
        "background": "#d44631"
    }
}
```

## How can I make a certain section of the log to have color, but not the entire log?
each log method contains two tags. `<color>` and `</color>`. Place what you would like to be colored in between `<color>` and `</color>`,
example:
```js
"(<time>) <color>[ <source-short> ]</color> => <message>"
```
Do note that right now the color tags only support one thing to be colored at the moment. Later on in the future you will be color as many things as you wish.

## How do I make it write logs?
in the config file, there is a key called `writeToLog`, make these true to enable it to create Logs. Make sure you have the base folder created for the Logger, so it knows where you wish to keep the log files.

## Log Paths
Log paths are the directory of where you wish the logs to go to. by default it requires a folder called Logs made for it.

```json
"logPaths": {
    "error": "./Logs/error"
}
```

## How to change the time pattern?
In the config file there will be a key called `timePattern`, change this to be what you would like. This is using `moment`, so check moment's documentation for what kind of time patterns you can use. If it doesn't exist for you, then rerun your program, and it should be added to the config.

