const winston = require('winston');
const WriteStream = require('fs').WriteStream;
const path = require('path');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json({
    space: 1
  }),
  transports: [
    new winston.transports.Console({level: 'info'}),
    new winston.transports.File({ filename: path.join('logs', 'error.log') , maxsize: 10000000, level: 'error',  }),
    new winston.transports.File({ filename: path.join('logs', 'info.log'), maxsize: 10000000, level: 'info' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'PROD') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;