angular.module('excelCourses').controller('checkout', function(mainService, $scope, $interval, $compile, $state  ){

$scope.numberStudents = 10

$scope.getClassSize = function(){
  mainService.getClassClient().then(function(res){
    let data = {cohort: res.data.cohort}
    mainService.getClassSize(data).then(function(res){
      $scope.numberStudents = res
      })
    })
}
$scope.getClassSize()
$scope.addEBspecial = function(){
  location.reload()
}
$scope.getAllevents = function(){
  let cohort = 0
  mainService.getClassClient().then(function(res){
     cohort = res.data.cohort
     mainService.getAllevents().then(function(res){
       let courses = res.data
       for(let i = 0; i < courses.length; i++){
         if(courses[i][0].id === cohort){
           $scope.currentClient.courseInfo = courses[i][0]
           let unxDate = Math.round(new Date().getTime() / 1000)
           if($scope.currentClient.courseInfo.coursedate > (unxDate + 2629743)){
             $scope.currentClient.earlyBird = true
             console.log($scope.currentClient.earlyBird)
             mainService.addEBspecial({ebSpecial: -100}).then(function(res){
               })
           }else{
             $scope.currentClient.earlyBird = false
           }
         }
       }
       })
  })
}
$scope.getAllevents()



})
