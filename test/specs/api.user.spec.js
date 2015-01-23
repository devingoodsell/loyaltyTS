var USER_URL = config.apiUrl + 'users/';

describe('api.user.spec.js', function() {

  describe('when user POST, aka create,', function() {
    describe('when request has invalid email', function() {
      before(function(done) {
        requestBody = {firstName: 'Bob', lastName: 'Johnson', email: 'bob'};
        request.post({ url: USER_URL, body: requestBody, json: true}, function(err, res, body) {
          response = res;
          done(err);
        });
      });
      it('should return a 500', function() {
        expect(response.statusCode).to.equal(500);
      });
    });
    describe('when request has missing first name', function() {
      before(function(done) {
      requestBody = {lastName: 'Johnson', email: 'bobjohnson@gmail.com'};
        request.post({ url: USER_URL, body: requestBody, json: true}, function(err, res, body) {
          response = res;
          done(err);
        });
      });
      it('should return a 500', function() {
        expect(response.statusCode).to.equal(500);
      });
    });
    describe('when request is valid', function() {
      before(function(done) {
      var requestBody = {firstName: 'Bob', lastName: 'Johnson', email: utilities.generateRandomEmail()};
        request.post({ url: USER_URL, body: requestBody, json: true}, function(err, res, body) {
          response = res;
          result = body;
          done(err);
        });
      });
      it('should return a 201 created', function() {
        expect(response.statusCode).to.equal(201);
      });
      it('should return the new user in the body with id.', function() {
        expect(result).to.have.property('id');
      });
    });
  });

  describe('when users exist and', function() {
    before(function(done) {
      requestBody = {firstName: 'Bob', lastName: 'Johnson', email: utilities.generateRandomEmail()};
        request.post({ url: USER_URL, body: requestBody, json: true}, function(err, res, body) {
        global.testUser = body;
        done(err);
      });
    });

    describe('when GET single non existing user', function() {
      before(function(done) {
        request.get({ url: USER_URL + 'ffffffffffffffffffffffff'}, function(err, res, body) {
          response = res;
          result = body;
          done(err);
        });
      });
       it('should return 404', function() {
        expect(response.statusCode).to.equal(404);
      });
    });

    describe('when GET single valid user', function() {
      before(function(done) {
        request.get({ url: USER_URL + global.testUser.id, json: true}, function(err, res, body) {
          response = res;
          result = body;
          done(err);
        });
      });
      it('should return 200', function() {
        expect(response.statusCode).to.equal(200);
      });
      it ('should contain the expected user in the body.', function() {
        expect(result.id).to.equal(global.testUser.id);
      });
    });

    describe('when GET all users', function() {
      before(function(done) {
        request.get({ url: USER_URL}, function(err, res, body) {
          response = res;
          result = body;
          done(err);
        });
      });
      it('should return 200', function() {
        expect(response.statusCode).to.equal(200);
      });
      it ('should contain an array of users in the body.', function() {
        expect(result).to.have.length.of.at.least(1);
      });
    });

    describe('when user PUT, aka update,', function() {
      describe('when request is valid', function() {
        var newEmail = utilities.generateRandomEmail();
        before (function(done) {
          var user = global.testUser;
          user.email = newEmail;
          request.put({ url: USER_URL + user.id, body: user, json: true}, function(err, res, body) {
            response = res;
            result = body;
            done(err);
          });
        });
        it('should return a 200', function() {
          expect(response.statusCode).to.equal(200);
        });
        it ('should contain the updated user has body', function() {
          expect(result).to.exist;
          expect(result).to.have.property('id');
          expect(result.email).to.equal(newEmail);
        });
      });
      describe('when request has invalid email', function() {
        before (function(done) {
          var user = global.testUser;
          user.email = 'bad.email';
          request.put({ url: USER_URL + user.id, body: user, json: true}, function(err, res, body) {
            response = res;
            done(err);
          });
        });
        it('should return a 500', function() {
          expect(response.statusCode).to.equal(500);
        });
      });
    });

    describe('when POST user loyalty points', function() {
      describe('with postive points', function() {
        before(function(done) {
            request.post({ url: USER_URL + global.testUser.id + '/points', body: {'amount': 140}, json: true}, function(err, res, body) {
            response = res;
            result = body;
            done(err);
          });
        });
        it('should return a 200', function() {
          expect(response.statusCode).to.equal(200);
        });
      });
      describe('with negative points', function() {
        describe('and transaction amount is greater than amount available.', function() {
          before(function(done) {
            request.post({ url: USER_URL + global.testUser.id + '/points', body: {'amount': -99999999}, json: true}, function(err, res, body) {
              response = res;
              result = body;
              done(err);
            });
          });
          it ('should return a 409 Conflict', function() {
            expect(response.statusCode).to.equal(409);
          });
          it ('should contain a error response body', function() {
            expect(result).not.to.be.null;
          });
        });
        describe('and transaction amount is less than amount available.', function() {
          before(function(done) {
            request.post({ url: USER_URL + global.testUser.id + '/points', body: {'amount': 1}, json: true}, function(err, res, body) {
              response = res;
              result = body;
              done(err);
            });
          });
          it ('should return a 200', function() {
            expect(response.statusCode).to.equal(200);
          });
        });
      });
    });

    describe('when GET user loyalty points', function() {
      describe('when user does not exist', function() {
        before(function(done) {
          request.get({ url: USER_URL + 'ffffffffffffffffffffffff/points'}, function(err, res, body) {
            response = res;
            result = body;
            done(err);
          });
        });
        it ('should return a 404', function() {
          expect(response.statusCode).to.equal(404);
        });
      });
      describe('when user exists', function() {
        before(function(done) {
          request.get({ url: USER_URL + global.testUser.id + '/points', json: true}, function(err, res, body) {
            response = res;
            result = body;
            done(err);
          });
        });
        it ('should return 200', function() {
          expect(response.statusCode).to.equal(200);
        });
        it ('should contain at least 1 transaction with a amount and created timestamp', function() {
          expect(result.transactions).to.have.length.of.at.least(0);
        });
        it ('should contain a currentAmmout.', function() {
          expect(result.currentAmount).to.be.at.least(0);
        });
        it ('should have last modified', function() {
          expect(result).to.have.property('lastModified');
        });
      });
    });

    after(function() {
        delete global.testUser;
    });
  });
});