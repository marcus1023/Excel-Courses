var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config.js');
var passport = require('passport');
var massive = require('massive');
/*var connect = massive.connectSync({connectionString: config.connectionString});*/
var massiveInstance = massive.connectSync({connectionString : config.connectionString})
var app = module.exports = express();


//DB controllers required
let usersCtlr = require('./controllers/users.js') ;

app.set('db', massiveInstance);
var db = app.get('db');

var corsOptions = {
	origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());


// system API routes
	app.post('/api/createNewUser', usersCtlr.createNewUser);





app.listen(3000, function(){
  console.log('I\'m listening on port 3000');
})
