# Log Files

## How to enabled the function to allow Writing Logs?

in the `log-system.config.json`, there is a section called `writeToLog`. Change this to true, and it will enable the writing to log function.

## It is throwing an error at me, when I try to execute my program.

Yes, there will be an error saying that it can't find Logs. you need to make this folder. The reason for this, is that it needs to know what base folder it needs to write to. With out this made, it has no idea where to store the log files. make sure you make this folder.