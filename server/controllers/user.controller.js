/* jslint node:true */
'use strict';

/*
 * Simple errors are currently being returned all with 500.
 * This should be updated to reflect better error handling such as
 * 400 bad request for missing or invalid data.
 * Also we should apply a transform to limit the data coming back
 * on users so it's in a common format removing any mongo specific fields.
 */

var
  User = require('../models/user.model'),
  logger = require('../../logger.js')('userController'),
  transform = require('../userTransform')
;

exports.create = function(req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  user.save(function(err) {
    if (err) {
      logger.error('Error encountered on user save: ', err);
      return res.status(500).send(JSON.stringify(err));
    }

    res.status(201).json(transform.toOutboundUser(user));
  });
};

exports.getById = function(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      logger.error('Error encountered on user getById: ', err);
      return res.status(500).send(JSON.stringify(err));
    }
    else if (!user)
      return res.status(404).send();

    res.json(transform.toOutboundUser(user));
  });
};

exports.update = function(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      logger.error('Error encountered on user getById: ', err);
      return res.status(500).send(JSON.stringify(err));
    }
    else if (!user)
      return res.status(404).send();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    user.save(function(err, user) {
      if (err) {
        logger.error('Error encountered on findByIdAndUpdate: ', err);
        return res.status(500).send(JSON.stringify(err));
      }

      res.json(transform.toOutboundUser(user));
    });
  });
};

exports.getAll = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      logger.error('Error encountered on user getAll: ', err);
      return res.status(500).send(JSON.stringify(err));
    }

    res.json(transform.toOutboundUser(users));
  });
};

exports.getPointsByUserId = function(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      logger.error('Error encountered on loyalty getByUserId: ', err);
      return res.status(500).send(JSON.stringify(err));
    }
    else if (!user)
      return res.status(404).send();

    res.json(user.loyaltyPoints);
  });
};

exports.updateUserPoints = function(req, res, next) {
  var pointTransaction = {
    amount: req.body.amount
  };

  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      logger.error('Error encountered on loyalty update.findOne: ', err);
      return res.status(500).send(JSON.stringify(err));
    } else if (!user) {
      return res.status(404).send();
    } else if (pointTransaction.amount < 0 && (user.loyaltyPoints.currentAmount + pointTransaction.amount) < 0) {
      return res.status(409).send(JSON.stringify({error: 'Transaction amount exceeded balance.'}));
    }

    user.loyaltyPoints.transactions.push(pointTransaction);
    user.loyaltyPoints.currentAmount += pointTransaction.amount;
    user.save(function(err) {
      if (err) {
        logger.error('Error encountered on loyalty update.save: ', err);
        return res.status(500).send(JSON.stringify(err));
      }
      res.status(200).send();
    });
  });
};

/*
 * Provided to DI inject a new model for testing if desired. This should
 * never be used by a production environment.
 */
exports.dependencyInjectModel = function(model) {
  User = model;
};