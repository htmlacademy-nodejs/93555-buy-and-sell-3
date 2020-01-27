"use strict";

const { Cli } = require(`./cli`);
const { DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode } = require(`../constants`);

// process.argv (node ./src/service/service.js --generate 10)
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\...\\93555-buy-and-sell-3\\src\\service\\service.js',
//   '--generate',
//   '10'
// ]

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments; // '--generate' = ['--generate', '10']

if (!Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArguments.slice(1));
