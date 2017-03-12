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
  confirmCohort: function (req, res) {
    let data = req.body
    console.log(data)
    let cohort = data.cohort
    let id = '{'+ data.id +'}'
    db.confirmCohort([id,cohort], function (err, result) {
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
    if(!req.session.client.purchaseTypeLog){
      req.session.client.purchaseTypeLog = []
    }
    if(req.body.id === 2 && req.session.client.purchaseTypeLog.indexOf(2) === -1){
      req.session.client.purchaseTypeLog.push(2)
      req.session.client.purchaseType.push(req.body)
    }
    if(req.body.id === 3 && req.session.client.purchaseTypeLog.indexOf(3) === -1){
      req.session.client.purchaseTypeLog.push(3)
      req.session.client.purchaseType.push(req.body)
    }
    if(req.body.id === 1 && req.session.client.purchaseTypeLog.indexOf(1) === -1){
      req.session.client.purchaseTypeLog.push(1)
      req.session.client.purchaseType.push(req.body)
    }

    //create savings array and logic
    req.session.client.savingsType = []
    req.session.client.savingsTypeLog = []
    savingsArrFunct = function(){
      let mentoringCashe = 0
      let consultancyCashe = 0
      for(let i = 0; i < req.session.client.savingsType.length; i++){
        if(req.session.client.savingsType[i].type === '1-1 Mentoring'){
          mentoringCashe = -1
        }
        if(req.session.client.savingsType[i].type === 'Excel Consultancy'){
          consultancyCashe = -1
        }
      }
      if(req.session.client.savingsTypeLog.indexOf(1) !== -1 && req.session.client.savingsTypeLog.indexOf(2) !== -1 && mentoringCashe === 0){
        req.session.client.savingsType.push({type:'1-1 Mentoring', price:-50})
        console.log(req.session.client.savingsType)
      }
      if(req.session.client.savingsTypeLog.indexOf(1) !== -1 && req.session.client.savingsTypeLog.indexOf(3) !== -1 && consultancyCashe === 0){
        req.session.client.savingsType.push({type:'Excel Consultancy', price:-50})
        console.log(req.session.client.savingsType)
      }
    }
    for(let i = 0; i < req.session.client.purchaseType.length; i++){
      req.session.client.savingsTypeLog.push(req.session.client.purchaseType[i].id)
      savingsArrFunct();
    }
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
      db.getuserfromuser([preferName], function (err, result) {
        console.log(result[0].id)
        req.session.client.userid = result[0].id
        res.send(req.session.client)
      })
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
  },
  createEvent: function (req, res) {
    console.log(req.body)
    let name = req.body.name
    let month = req.body.month.number
    let day = req.body.day.day
    let year = req.body.year.year
    let dateCalc = year+'.'+month+'.'+day
    let dateBeauty = day+' - '+req.body.month.name+' - '+year
    let unxDate = new Date(dateCalc).getTime() / 1000
    //second date crap MOMOMOMOMOMOMOMOMFOMOMOMOMOMUMOMOMOMOMCMOMOMOMKMOMOMOMYMOMOMOMOU
    let month2 = req.body.month2.number
    let day2 = req.body.day2.day
    let year2 = req.body.year2.year
    let dateCalc2 = year2+'.'+month2+'.'+day2
    let dateBeauty2 = day2+ ' - ' +req.body.month2.name+' - '+year2
    let unxDate2 = new Date(dateCalc2).getTime() / 1000
    console.log('dateBeauty2',dateBeauty2,'unxDate2',unxDate2)
    db.createEvent([name,unxDate,dateBeauty,unxDate2,dateBeauty2], function(err,result){
      res.send('event logged')
      })
  },
  getAllevents: function (req, res) {
    db.getAllevents(function(err,result){
      let unxDate = Math.round(new Date().getTime() / 1000)
      let eventCalc = []
      let earlyBirdCalc = []
      for(let i = 0; i < result.length; i++){
        if(result[i].coursedate > unxDate){
          eventCalc.push(result[i])
        }
        if(result[i].coursedate > (unxDate + 2629743)){
          earlyBirdCalc.push(result[i].coursedate)
        }
      }
      let newEBArr = earlyBirdCalc.sort()
      var delta = newEBArr[0] - unxDate
      let ebDays = Math.floor(delta/86400)
      delta -= (ebDays * 86400)
      var ebHours = Math.floor(delta / 3600);
      delta -= ebHours * 3600;
      var ebMinutes = Math.floor(delta / 60) % 60;
      delta -= ebMinutes * 60;
      let ebTimer = {days:ebDays, hours: ebHours, minutes:ebMinutes}
      req.session.ebTimer = ebTimer
      res.send(eventCalc)
      })
  },
  getebTimer: function (req, res) {
    res.send(req.session.ebTimer)
  },
  selectCourse: function (req, res) {
    if(!req.session.client){
      req.session.client = []
    }
    req.session.client.cohort = req.body.id
    console.log(req.session.client.cohort)
    res.send(req.session.client)
  },
  saveNewTesty: function (req, res) {
    console.log(req.body)
    let data = req.body
    let name = data.name
    let location = data.location
    let body = data.testy
    db.saveNewTesty([name,location,body], function(err,result){
      res.send('testy logged')
      console.log(err)
      })
  },
  getTestys: function (req, res) {
    db.getTestys(function(err,result){
      req.session.testimonials = result
      res.send(req.session.testimonials)
      })
  }
}
