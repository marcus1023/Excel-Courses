angular.module('excelCourses' ).service('mainService', function($http, $q){

  this.createNewUser = function(data){
    return $http({
      method: 'POST',
      url: "/api/createNewUser",
      data: data
    })
  }



})
