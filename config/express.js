/* jslint node:true */
'use strict';

/*
 * Currently there is no API level authentication which leaves major
 * security holes. Should include an API auth per consumer to verify integrity.
 * This would mean a user system with token key combinations need to be built.
 * Also system allows for replay attacks, auth should include time based unique request
 * verification.
 */

var
  express   = require('express'),
  path      = require('path'),
  config    = require('./config'),
  mongoose  = require('./mongoose'),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override")
;

module.exports = function() {
  var
    db  = mongoose(),
    app = express()
  ;

  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(bodyParser.urlencoded({
    extended:true
  }));

  require('../server/routes.js')(app);

  return app;
};