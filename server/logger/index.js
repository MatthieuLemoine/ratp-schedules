const chalk = require('chalk');

const getLogger = (level, colorizer, logger) => arg => logger(`${colorizer(`[${level}]`)}: ${arg}`);

module.exports = {
  error: getLogger('error', chalk.red, console.error),
  warn: getLogger('warn', chalk.yellow, console.warn),
  info: getLogger('info', chalk.green, console.info),
  debug: getLogger('debug', chalk.blue, console.log),
};
