/**
 * @summary This is the System Class. This is not a user class. This is for me to write messages to the user.
 * @author Cody Spratford
 * @since 9/29/2020
 */
const chalk = require("chalk");

/**
 * @class
 * @classdesc This is not a class that the user can use. this is a system message system.
 */
module.exports = class System {
    constructor() {
        // Make the Name into ascii art.
        const ascii = `
.____                     _________               __                  
|    |    ____   ____    /   _____/__.__. _______/  |_  ____   _____  
|    |   /  _ \\ / ___\\   \\_____  <   |  |/  ___/\\   __\\/ __ \\ /     \\ 
|    |__(  <_> ) /_/  >  /        \\___  |\\___ \\  |  | \\  ___/|  Y Y  \\
|_______ \\____/\\___  /  /_______  / ____/____  > |__|  \\___  >__|_|  /
        \\/    /_____/           \\/\\/         \\/            \\/      \\/ `
        console.log(chalk.greenBright(ascii));
        // Write thank you for using Log System.
        console.log(chalk.black.bgGreenBright("Thank you for using Log System. Your config file will be maded now. Enjoy using Log System! ^-^"));
    }
}
