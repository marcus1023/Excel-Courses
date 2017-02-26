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
  this.connectCMS = function(){
    return $http({
      method: 'GET',
      url: "/api/connectCMS"
    })
  }



})
