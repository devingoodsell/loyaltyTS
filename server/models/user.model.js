/* jslint node:true */
'use strict';

var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema
;

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: { unique: true },
    match: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
  },
  loyaltyPoints: {
    currentAmount: {
      type: Number,
      default: 0
    },
    transactions: [{
      amount: {
        type: Number,
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      }
    }],
    lastModified: {
      type: Date,
      default: Date.now
    }
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);