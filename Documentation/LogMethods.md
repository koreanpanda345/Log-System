# Different Log Types

- log: Default log messages.
- error: Error Messages.
- warn: Warning Messages.
- debug: Debug messages.

## How to use the log methods?
```js
const LogSystem = require("@koreanpanda/log-system");
const logger = new LogSystem();

// Logging messages
logger.log("messages");
// Error Messages
// Type is not needed, but if you want to say what type it is, then you can.
logger.error("error", "type");
// Warn Messages
logger.warn("warn");
// Debug Messages
logger.debug("debug");
```

## Log Patterns

Log Patterns are basically a template the the log methods uses. you can change it to be what ever you want it to be. under this is the list of placeholders that each log method uses.

```js
// Error Patterns Placeholders.
"<error>" // Error message
"<source>" // The full file path that the error occured in.
"<source-short>" // The file name that the error occured in.
"<time>" // The timestamp. Bacisally when the message was sent.

//Log Patterns Placeholders.
"<message>" // Log message
"<source>" // The full file path that the log originated in.
"<source-short" // The file name that the log originated in.
"<time>" // The timestamp. Basically when the message was sent.

//Warn Patterns Placeholders.
"<warn>" // Warn message
"<source>" // The full file path that the warning originated in.
"<source-short" // The file name that the warning originated in.
"<time>" // The timestamp. Basically when the message was sent.

//Debug Patterns Placeholders.
"<debug>" // Debug message
"<source>" // The full file path that the debug originated in.
"<source-short" // The file name that the debug originated in.
"<time>" // The timestamp. Basically when the message was sent.
```

## How to change the colors of the types?

in the `log-system.config.json` there is a section called `logColors` in there you can change the colors.

Example:
```json
"logColors": {
    "error": {
        "text": "white",
        "background": "#d44631"
    }
}
```
