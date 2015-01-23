/* jslint node:true */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

var
  express = require('./config/express'),
  app = express(),
  port = process.env.PORT || 4444
;

app.listen(port, function() {
  console.log('HTTP Server running on port ' + port);
});