var routes = require('../routes/index');
var users = require('../routes/users');
var usersApi = require('../routes/usersApi');

module.exports = function (app){
      app.use('/', routes);
      app.use('/user', users);
      app.use('/api/user', usersApi);

}
