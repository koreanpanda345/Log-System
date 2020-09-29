const chalk = require("chalk");


module.exports = class System {
    constructor() {
        const ascii = `
.____                     _________               __                  
|    |    ____   ____    /   _____/__.__. _______/  |_  ____   _____  
|    |   /  _ \\ / ___\\   \\_____  <   |  |/  ___/\\   __\\/ __ \\ /     \\ 
|    |__(  <_> ) /_/  >  /        \\___  |\\___ \\  |  | \\  ___/|  Y Y  \\
|_______ \\____/\\___  /  /_______  / ____/____  > |__|  \\___  >__|_|  /
        \\/    /_____/           \\/\\/         \\/            \\/      \\/ `
        console.log(chalk.greenBright(ascii));
        console.log(chalk.black.bgGreenBright("Thank you for using Log System. Your config file will be maded now. Enjoy using Log System! ^-^"));
    }
}
