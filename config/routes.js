var routes = require('../routes/index');
var users = require('../routes/users');
var usersApi = require('../routes/usersApi');
var accomodation = require('../routes/accomodation');

module.exports = function (app,passport){
      app.use('/', routes);
      app.use('/user', users);
      app.use('/api/user', usersApi);
      app.use('/accomodation', accomodation);
    
    

}