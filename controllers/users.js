let app = require('../server.js') ;
var massive = require('massive');
var massiveInstance = massive.connectSync({connectionString :"postgres://fttsyrkr:mLitX6Hyis07JVHiupoyxiTV2Owlc_CR@babar.elephantsql.com:5432/fttsyrkr"})
app.set('db', massiveInstance);
var db = app.get('db');

module.exports = {
  createNewUser: function (req, res) {
    let data = req.body
    let fullName = data.fullName
    let email = data.email
    let type = data.type
    db.createNewUser([fullName, email,type ], function (err, result) {
    })
  },
  confirmCohort: function (req, res) {
    req.session.client.fullPayment = req.body.fullPayment
    let data = req.body;
    let cohort = data.cohort;
    let id = '{'+ data.id +'}';
    let name = '{'+ req.body.name + ":" +data.id +'}';
    let studentId = data.id;
    db.updatePayment([studentId,req.session.client.fullPayment ], function (err, result) {
      console.log(err,result)
    })
    db.getCohortList([cohort], function (err, result) {
      let studentsArr = result[0].students;
      if(studentsArr){
        if(studentsArr.indexOf(studentId) !== -1){
           res.send("User already in cohort!")
        }else{
          db.confirmCohort([id,cohort], function (err, result) {
            console.log(err,result)
          })
          db.confirmCohortName([name,cohort], function (err, result) {
            console.log(err,result)
            res.send("User put in cohort!")
          })
        }
      }
    })
  },
  addPeopleToClass: function (req, res) {
    let cohort = req.body.cohort
    let number = req.body.number
    req.session.client.peopleinCohort = number
    for(i = 0; i < number; i++){
      let id = '{'+ req.body.userid + i +'}'
      let name = '{'+ req.body.name + i +'}'
      req.session.client.purchaseType.push({ type: 'Excel Course', price: 600, id: 1 })
      req.session.client.savingsType.push({ type: 'Extra Student', price: -50 })
      db.confirmCohort([id,cohort], function (err, result) {
        console.log(err,result)
      })
      db.addChildren([id,req.body.userid], function (err, result) {
        console.log(err,result)
      })
    }
    res.send(req.session.client)
  },
  addToSubscript: function (req, res) {
    let data = req.body
    let fullName = data.name
    let email = data.email
    let type = data.type
    db.addToSubscript([fullName, email,type ], function (err, result) {
      res.send("User Saved!")
    })
  },
  authenticate: function (req, res) {
    let password = req.body.password;
    let email = req.body.email;
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
      }
      if(req.session.client.savingsTypeLog.indexOf(1) !== -1 && req.session.client.savingsTypeLog.indexOf(3) !== -1 && consultancyCashe === 0){
        req.session.client.savingsType.push({type:'Excel Consultancy', price:-50})
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
    let cohort = data.cohort
    console.log(cohort)
    let type = 'client'
    if(!req.session.client){
      req.session.client = {}
    }
    req.session.client.info = data;
    req.session.client.paymentReady = true;
    db.newClient([pasport, pasportName,preferName, email, address, postalCode, phone,birthDate,type,cohort, 0 ], function (err, result) {
      console.log(err,result)
      db.getuserfromuser([preferName], function (err, result) {
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
    db.createEvent([name,unxDate,dateBeauty,unxDate2,dateBeauty2], function(err,result){
      res.send('event logged')
      })
  },
  getAllevents: function (req, res) {
    db.getAllevents(function(err,result){
      let unxDate = Math.round(new Date().getTime() / 1000)
      let eventCalc = []
      let eventCalcShow = []
      let earlyBirdCalc = []
      for(let i = 0; i < result.length; i++){
        if(result[i].coursedate > unxDate){
          eventCalc.push(result[i])
        }
        if(result[i].coursedate > (unxDate + 2629743)){
          earlyBirdCalc.push(result[i].coursedate)
        }
        if(result[i].students === null || result[i].students.length < 9){
          eventCalcShow.push(result[i])
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
      res.send([eventCalc, eventCalcShow])
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
    res.send(req.session.client)
  },
  saveNewTesty: function (req, res) {
    let data = req.body
    let name = data.name
    let location = data.location
    let body = data.testy
    db.saveNewTesty([name,location,body], function(err,result){
      res.send('testy logged')
      })
  },
  getTestys: function (req, res) {
    db.getTestys(function(err,result){
      req.session.testimonials = result
      res.send(req.session.testimonials)
      })
  },

  // GET ALL  STUDENTS
  getAllStudents: function (req, res) {
    db.getAllStudents(function(err,result){
      res.send(result)
      })
  },
  confirmPayment: function (req, res) {
    console.log("confirm",req.body)
    let id = req.body.id
    let refId = "{"+req.body.id+"}"
    let course = req.body.course
    db.confirmPayment([id, 1],function(err,result){
      console.log(result,err)
    })
    db.updateStudentsConfirmed([course, refId],function(err,result){
      console.log(result,err)
    })
  }
}
