angular.module('excelCourses').controller('customerReport', function(mainService, $scope, $interval, $compile, $state  ){

$scope.sendConfirmationEmail = function(){
  mainService.sendConfirmationEmail().then(function(res){
    console.log(res.data)
    })
}
  $scope.getClient = function(){
    mainService.getClient().then(function(res){
      console.log(res.data)
      $scope.currentClient = res.data;
      console.log("got back!?")
      })
  }
  $scope.getClient();
  $scope.getAllevents = function(){
    mainService.getAllevents().then(function(res){
      $scope.currentEvents = res.data;
      console.log('$scope.currentEvents',$scope.currentEvents)
      })
  }
  $scope.getAllevents();
  })
