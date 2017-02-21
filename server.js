var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
/*var config = require('./config.js');*/
/*var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;*/
var passport = require('passport');
var massive = require('massive');
/*var connectionString = `postgres://${config.postgresUser}:${config.postgresPass}@localhost/devdiscover`;*/
/*var massiveInstance = massive.connectSync({connectionString : connectionString})*/
var app = module.exports = express();

/*app.set('db', massiveInstance);*/
var db = app.get('db');

var corsOptions = {
	origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());


/*app.use(session({
	secret: config.sessionSecret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge:(1000*60*60*24*7)
	}
}));*/

// linkedin Oauth -



app.listen(3000, function(){
  console.log('I\'m listening on port 3000');
})
