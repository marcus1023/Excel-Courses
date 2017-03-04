var fluidCms = require('./fullCms.js')
var session = require('express-session');
var fs = require('fs');
let app = require('../server.js') ;
var massive = require('massive');
var massiveInstance = massive.connectSync({connectionString :"postgres://fttsyrkr:8f1-v4wG_mbqob8QnuGtAp15hdrFfCtd@babar.elephantsql.com:5432/fttsyrkr"})
app.set('db', massiveInstance);
var db = app.get('db');

module.exports = {
  cmsConnect: function(req, res){
    db.getCms( function (err, result) {
      res.send(result[0].cms)
    })
  },
  saveCms: function(req, res){
    cms = req.body
    db.updateCms([cms], function (err, result) {
      res.send("fluidCms.fullCms")
    })
  }
}
