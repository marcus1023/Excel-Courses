let app = require('../server.js') ;
var massive = require('massive');
var massiveInstance = massive.connectSync({connectionString :"postgres://fttsyrkr:8f1-v4wG_mbqob8QnuGtAp15hdrFfCtd@babar.elephantsql.com:5432/fttsyrkr"})
app.set('db', massiveInstance);
var db = app.get('db');

module.exports = {
  createNewUser: function (req, res) {
    let data = req.body
    let fullName = data.fullName
    let email = data.email
    let type = data.type
    db.createNewUser([fullName, email,type ], function (err, result) {
      console.log(result,err)
    })
  },
  addToSubscript: function (req, res) {
    let data = req.body
    let fullName = data.name
    let email = data.email
    let type = data.type
    console.log("got to add subscriber",req.body)
    db.addToSubscript([fullName, email,type ], function (err, result) {
      console.log(result,err)
      res.send("User Saved!")
    })
  },
  authenticate: function (req, res) {
    let password = req.body.password; console.log(password)
    let email = req.body.email; console.log(email)
    db.authenticate([email], function (err, result) {
      if(result[0]){
        if(password === result[0].password ){
          req.session.user = result[0]
          res.send(req.session.user)
        }else{
          console.log("authentication failed")
        }
      }
    })
  },
  connectUser: function (req, res) {
    res.send(req.session.user)
  },
  runningTotal: function (req, res) {
    if(!req.session.client){
      req.session.client = {}
      req.session.client.runningTotal = req.body.total
    }else{
      req.session.client.runningTotal = req.body.total
    }
    res.send(req.session.client)
  },
  purchaseType: function (req, res) {
    if(!req.session.client){
      req.session.client = {}
    }
    if(!req.session.client.purchaseType){
      req.session.client.purchaseType = []
    }
    req.session.client.purchaseType.push(req.body);
    res.send(req.session.client)
  },
  newClient: function (req, res) {
    let data = req.body
    let pasport = data.pasport
    let pasportName = data.pasportName
    let preferName = data.preferName
    let email = data.email
    let address = data.address
    let postalCode = data.postalCode
    let phone = data.phone
    let birthDate = data.birthDate
    let type = 'client'
    if(!req.session.client){
      req.session.client = {}
    }
    req.session.client.info = data;
    req.session.client.paymentReady = true;
    db.newClient([pasport, pasportName,preferName, email, address, postalCode, phone,birthDate,type ], function (err, result) {
      console.log('got to new client')
      res.send(req.session.client)
    })
  },
  termsOfService: function (req, res) {
    if(!req.session.client){
      req.session.client = {}
    }
    req.session.client.termsOfService = "Accepted"
    res.send(req.session.client)
  },
  getClient: function (req, res) {
    res.send(req.session.client)
  }
}
