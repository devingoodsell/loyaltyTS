var userController = require('./controllers/user.controller');

module.exports = function(app) {
  app.route('/api/users')
    .get(userController.getAll)
    .post(userController.create);

  app.route('/api/users/:id')
    .get(userController.getById)
    .put(userController.update);

  app.route('/api/users/:id/points')
    .get(userController.getPointsByUserId)
    .post(userController.updateUserPoints);
};