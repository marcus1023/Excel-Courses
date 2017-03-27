angular.module('excelCourses').controller('customerReport', function(mainService, $scope, $interval, $compile, $state  ){

  $scope.getClient = function(){
    mainService.getClient().then(function(res){
      $scope.currentClient = res.data;
      console.log($scope.currentClient)
      $scope.holyshit()
      })
  }
  $scope.getAllevents = function(){
    mainService.getAllevents().then(function(res){
      let currentEvents = res.data[0];
      for(let i = 0; i < currentEvents.length; i++){
        if(currentEvents[i].id === $scope.currentClient.info.cohort){
          $scope.clientCohort = currentEvents[i]
        }
      }
    $scope.getClient()
    })
  }
  $scope.getAllevents();
  $scope.getClient()

  $scope.holyshit = function(){
    let data = {id: $scope.currentClient.userid}
    console.log(data)
    mainService.holyshit(data).then(function(res){
      $scope.currentClient.fullPayment = res.data.amount
      if($scope.currentClient.deferPayment === true){
        let data = {name: $scope.currentClient.info.pasportName, id: $scope.currentClient.userid, payment: 'none', amount: $scope.currentClient.fullPayment, courseId: $scope.currentClient.info.cohort, dates: {start: $scope.clientCohort.datebeauty, end: $scope.clientCohort.datebeauty2 } }
        console.log(data)
        mainService.sendDeferPaymentEmail(data)
      }else if($scope.currentClient.deferPayment === false){
        let data = {name: $scope.currentClient.info.pasportName, id: $scope.currentClient.userid, payment: 'made', amount: $scope.currentClient.fullPayment, courseId: $scope.currentClient.info.cohort, dates: {start: $scope.clientCohort.datebeauty, end: $scope.clientCohort.datebeauty2 } }
        mainService.sendConfirmationEmail(data)
      }
      })
  }

  })
