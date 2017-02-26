var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config.js');
var passport = require('passport');
var massive = require('massive');
var connect = massive.connectSync({connectionString: config.connectionString});
var massiveInstance = massive.connectSync({connectionString : config.connectionString})
var app = module.exports = express();
var cms = require('./controllers/cms.js');


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

app.use(session({
	secret: config.sessionSecret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge:(1000*60*60*24*7)
	}
}));

// system API routes
	app.post('/api/createNewUser', usersCtlr.createNewUser);
	app.post('/api/authenticate', usersCtlr.authenticate);
	app.post('/api/addToSubscript', usersCtlr.addToSubscript);
	app.get('/api/connectUser', usersCtlr.connectUser);


//CMS get call
app.get('/api/connectCMS', function (req, res) {
	res.send(cms)
})


app.listen(3000, function(){
  console.log('I\'m listening on port 3000');
})
