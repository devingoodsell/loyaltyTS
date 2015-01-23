exports.generateRandomEmail = function() {
  return 'bob.johnson' + Math.random() + '@gmail.com';
};

exports.generateUser = function(callback) {
  requestBody = {firstName: 'Bob', lastName: 'Johnson', email: utilities.generateRandomEmail()};
    request.post({ url: USER_URL, body: requestBody, json: true}, function(err, res, body) {
    user = body;
    done(err, user);
  });
};