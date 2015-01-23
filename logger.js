var winston = require ('winston');

module.exports = function(labelName) {
  return new winston.Logger({
    transports : [
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: labelName
      })
    ]
  });
};