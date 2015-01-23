/* jslint node:true */
'use strict';

exports.toOutboundUser = function(user) {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
};