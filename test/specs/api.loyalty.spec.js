describe('api.loyalty.spec.js', function() {
  describe('when GET user loyalty points', function() {
    describe('when user does not exist', function() {
      it ('should return a 404', function() {

      });
    });
    describe('when user exists', function() {
      before(function() {
        // Create a user
        // Add points to user
      });
      it ('should return 200', function() {

      });
      it ('should contain at least 1 transaction with a amount and created timestamp', function() {

      });
      it ('should contain a currentAmmout.', function() {

      });
      it ('should have last modified', function() {

      });
    });
  });

  describe('when POST user loyalty points', function() {
    describe('with postive points', function() {
      before(function() {
        // Create a user
      });
      it('should return a 200', function() {

      });
      it ('should add the transaction amount', function(){

      });
      it('should contain the transaction in the body', function() {

      });
    });
    describe('with negative points', function() {
      before(function() {
        // Create a user
      });
      describe('and transaction amount is greater than amount available.', function() {
        it ('should return a 409 Conflict', function() {

        });
        it ('should contain a error response body', function() {

        });
      });
      describe('and transaction amount is less than amount available.', function() {
        it ('should return a 200', function() {

        });
        it ('should deduct transaction amount', function(){

        });
        it('should contain the transaction in the body', function() {

        });
      });
    });
  });
});