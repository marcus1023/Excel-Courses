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
  this.contactEmail = function(Mail){
    console.log("got to service")
    return $http({
      method: 'POST',
      url: "/api/contactEmail",
      data: Mail
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
//client functionality
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



})
