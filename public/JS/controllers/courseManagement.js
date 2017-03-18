angular.module('excelCourses').controller('courseManagement', function(mainService, $scope, $interval, $compile, $state  ){

$scope.managedStudents = [];
$scope.managedStudentsConfirmed = [];
$scope.EventName = '';
$scope.EventCourse;

$scope.getStudentsinClass = function(id){
  $scope.EventCourse = id.id
  mainService.refineAllStudents(id.id).then(function(res){
    console.log(res)
    $scope.EventName = id.name
    $scope.managedStudents = res.allStudentsNC
    $scope.managedStudentsConfirmed = res.allStudentsConfirmed
    })
}

$scope.confirmPayment = function(id){
  console.log(id)
  let data = {id: id, course: $scope.EventCourse}
   let x = false
   if (confirm("are you sure you want to confirm this student has paied") == true) {
    x = true;
    } else {
    x = false;
    }
    if(x === true){
      mainService.confirmPayment(data).then(function(res){
        })
    }
}

$scope.getReport = function(student){
  $scope.currentStudent = student;
  console.log($scope.currentStudent);
}

$scope.ControllerAutoRuns = function(){
  mainService.getAllStudents()
  console.log('autoruns Done')
}
$scope.ControllerAutoRuns()

  })
