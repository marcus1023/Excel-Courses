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
var nodemailer = require('nodemailer');
var cms = require('./controllers/cms.js');
var fs = require('fs');
var router = express.Router();
var stripe = require('stripe')('sk_test_jy88Pcb4D72y1Jlt3DUCT4wg');

//DB controllers required
let usersCtlr = require('./controllers/users.js') ;

app.set('db', massiveInstance);
var db = app.get('db');

var corsOptions = {
	origin: 'http://localhost:3000/'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/sayHello', router);

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
	app.post('/api/purchaseType', usersCtlr.purchaseType);
	app.post('/api/newClient', usersCtlr.newClient);
	app.post('/api/runningTotal', usersCtlr.runningTotal);
	app.post('/api/createEvent', usersCtlr.createEvent);
	app.post('/api/saveCms', cms.saveCms);
	app.post('/api/selectCourse', usersCtlr.selectCourse);
	app.post('/api/saveNewTesty', usersCtlr.saveNewTesty);
	app.post('/api/confirmCohort', usersCtlr.confirmCohort);
	app.get('/api/connectUser', usersCtlr.connectUser);
	app.get('/api/getClient', usersCtlr.getClient);
	app.get('/api/cmsConnect', cms.cmsConnect);
	app.get('/api/termsOfService', usersCtlr.termsOfService);
	app.get('/api/getAllevents', usersCtlr.getAllevents);
	app.get('/api/getTestys', usersCtlr.getTestys);
	app.get('/api/getebTimer', usersCtlr.getebTimer);


	//EMAIL OUTLINE BEGIN
	app.post('/api/contactEmail', function handleSayHello(req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'benne@excelinfinity.com', // Your email id
            pass: 'NCCode24' // Your password
        }
    });
		var message = req.body.message
		var name = req.body.name
		var email = req.body.email
		var mailOptions = {
		    from: 'marcuslogden@gmail.com', // sender address
		    to: email, // list of receivers
		    subject: 'New Excell Infinity Contact!', // Subject line
		    html: '<b>New email from: </b>' + name + '<br><br>' + '<b>Message:</b> ' + message //, // plaintext body
		    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
		};
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.json({yo: 'error'});
		    }else{
		        console.log('Message sent: ' + info.response);
		        res.json({yo: info.response});
		    };
		});
});

//EMAIL OUTLINE ENDED


// Stripe BEGINS
app.post('/api/charge', function(req, res) {
    var stripeToken = req.body.stripeToken;
    var amount = req.body.ammount;
		console.log(req.body, req.body.stripeToken)
    stripe.charges.create({
        card: stripeToken,
        currency: 'usd',
        amount: amount
    },
    function(err, charge) {
        if (err) {
            res.sendStatus(500, err);
        } else {
            res.sendStatus(204);
        }
    });
});
// Stripe ENDS

app.listen(8080 , function(){
  console.log('I\'m listening on port 8080 ');
})
