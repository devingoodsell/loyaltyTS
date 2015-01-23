/* jslint node:true */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

var
  express = require('./config/express'),
  app = express()
;

app.listen('4444', function() {
  console.log('HTTP Server running on port 4444');
});