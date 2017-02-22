let app = require('../server.js') ;
var massive = require('massive');
var massiveInstance = massive.connectSync({connectionString :"postgres://fttsyrkr:5yRYHWbcEWJYGVGYGGsOcmLZhhbJfF3L@babar.elephantsql.com:5432/fttsyrkr"})
app.set('db', massiveInstance);
var db = app.get('db');

module.exports = {
  createNewUser: function (req, res) {
    console.log(req.body)
    let data = req.body
    let fullName = data.fullName
    let email = data.email
    let type = data.type
    db.createNewUser([fullName, email,type ], function (err, result) {
      console.log(result,err)
    //  res.send("again")
    })
  }
}
