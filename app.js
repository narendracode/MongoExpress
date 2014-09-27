var fs  = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/config');
var mongoose = require("mongoose");
var app = express();

var port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'app/views'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

var connect = function(){
   var options = {
      server: {
         socketOptions:{
            keepAlive : 1
         }
      }
   };
   mongoose.connect(config.db,options);
};
connect();

mongoose.connection.on('error',console.log);
mongoose.connection.on('disconnected',connect);

//bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
   if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

require('./config/routes')(app);
require('./config/express')(app);

//app.listen(port);
//console.log('Express app started on port ' + port);


module.exports = app;
