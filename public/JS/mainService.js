angular.module('excelCourses' ).service('mainService', function($http, $q){

  this.createNewUser = function(data){
    return $http({
      method: 'POST',
      url: "/api/createNewUser",
      data: data
    })
  }
  this.addToSubscript = function(data){
    return $http({
      method: 'POST',
      url: "/api/addToSubscript",
      data: data
    })
  }
  this.confirmCohort = function(data){
    return $http({
      method: 'POST',
      url: "/api/confirmCohort",
      data: data
    })
  }
  this.authenticate = function(data){
    return $http({
      method: 'POST',
      url: "/api/authenticate",
      data: data
    })
  }
  this.connectUser = function(){
    return $http({
      method: 'GET',
      url: "/api/connectUser"
    })
  }
//CMS functionality
this.cmsConnect = function(){
  return $http({
    method: 'GET',
    url: "/api/cmsConnect"
  })
}
this.saveCms = function(newCms){
  return $http({
    method: 'POST',
    url: "/api/saveCms",
    data: newCms
  })
}


//student control
this.getAllStudents = function(){
  var defer = $q.defer();
   $http({
    method: 'GET',
    url: "/api/getAllStudents"
  }).then(function(res){
    defer.resolve(res)
    })
  return defer.promise
}
this.refineAllStudents = function(id){
  console.log(id)
  var defer = $q.defer();
   $http({
    method: 'GET',
    url: "/api/getAllStudents"
  }).then(function(res){
    let allStudentsNC = []
    let allStudentsConfirmed = []
    let allStudents = {allStudentsNC:allStudentsNC,allStudentsConfirmed:allStudentsConfirmed }
    for(let i = 0; i < res.data.length; i++){
      if(res.data[i].course === id && res.data[i].confirmed === 0){
        allStudentsNC.push(res.data[i]);
      }
      if(res.data[i].course === id && res.data[i].confirmed === 1){
        allStudentsConfirmed.push(res.data[i])
      }
    }
    defer.resolve(allStudents)
    })
  return defer.promise
}
this.confirmPayment = function(id){
  return $http({
      method: 'POST',
      url: "/api/confirmPayment",
      data:id
    })
}


//client functionality
  this.addPeopleToClass = function(data){
    return $http({
      method: 'POST',
      url: "/api/addPeopleToClass",
      data: data
    })
  }
  this.purchaseType = function(data){
    return $http({
      method: 'POST',
      url: "/api/purchaseType",
      data: data
    })
  }
  this.newClient = function(data){
    return $http({
      method: 'POST',
      url: "/api/newClient",
      data: data
    })
  }
  this.getebTimer = function(){
    return $http({
      method: 'GET',
      url: "/api/getebTimer"
    })
  }
  this.termsOfService = function(){
    return $http({
      method: 'GET',
      url: "/api/termsOfService"
    })
  }
  this.getClient = function(){
    return $http({
      method: 'GET',
      url: "/api/getClient"
    })
  }
  this.runningTotal = function(data){
    return $http({
      method: 'POST',
      url: "/api/runningTotal",
      data: data
    })
  }
//Testy controll
this.saveNewTesty = function(data){
  return $http({
    method: 'POST',
    url: "/api/saveNewTesty",
    data: data
  })
}
this.getTestys = function(){
  return $http({
    method: 'GET',
    url: "/api/getTestys"
  })
}
  //Events and courses
  this.createEvent = function(data){
    return $http({
      method: 'POST',
      url: "/api/createEvent",
      data: data
    })
  }
  this.getAllevents = function(){
    return $http({
      method: 'GET',
      url: "/api/getAllevents"
    })
  }
  this.selectCourse = function(id){
    return $http({
      method: 'POST',
      url: "/api/selectCourse",
      data: id
    })
  }
  // stripePayment
  this.stripePayment = function(data){
    return $http({
      method: 'POST',
      url: "/api/charge",
      data: data
    })
  }
// EMAIL SERVICES
this.contactEmail = function(Mail){
  console.log("got to service")
  return $http({
    method: 'POST',
    url: "/api/contactEmail",
    data: Mail
  })
}
this.sendRegisteredEmail = function(Mail){
  console.log("got to service")
  return $http({
    method: 'POST',
    url: "/api/sendRegisteredEmail",
    data: Mail
  })
}
this.sendConfirmationEmail = function(Mail){
  console.log("got to service")
  return $http({
    method: 'POST',
    url: "/api/sendConfirmationEmail",
    data: Mail
  })
}


})
