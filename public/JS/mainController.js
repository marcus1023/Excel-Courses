angular.module('excelCourses').controller('mainController', function(mainService, $scope, $interval, $compile, $state  ){


$scope.testingToDB = function(){
  let data = {name: "jimmy", email: "james@collufloweer.cam"}
  mainService.testingToDB(data).then(function(res){
  })
}

$scope.earlyBirdTimerM = 60
$scope.earlyBirdTimerS = 1
$scope.earlyBirdTimerZ;

  $interval(function(){

    if($scope.earlyBirdTimerS > 0){
      $scope.earlyBirdTimerS -= 1
      if($scope.earlyBirdTimerS < 10 && $scope.earlyBirdTimerS > 0){
        $scope.earlyBirdTimerZ = 0;
      }
      if($scope.earlyBirdTimerS > 10){
        $scope.earlyBirdTimerZ = undefined;
      }
    }
    if($scope.earlyBirdTimerS === 0){
      $scope.earlyBirdTimerM -= 1
      $scope.earlyBirdTimerS = 60
      if($scope.earlyBirdTimerM <= 0){
        $scope.earlyBirdTimerM = "fin"
        $scope.earlyBirdTimerS = "shed"
      }
    }
  }, 2000);



$scope.createNewUser = function(newUser){
  mainService.createNewUser(newUser).then(function(res){

    });
}
$scope.authenticate = function(newUser){
  mainService.authenticate(newUser).then(function(res){
    data = res.data
    $scope.currentUser = data;
    if(res.data.name){
      $('.admin-welcome-wrap').css("display", "flex").css("opacity", ".3").animate({
        opacity: "1"
      }, 500)
      setTimeout(function() {
        $('.admin-welcome-wrap').animate({
          opacity: 1,
          height: "-1000vh",
          top: "-1000px"
        }, 3750);
        }, 1600 );
      setTimeout(function() {
        window.location = "/#/adminTools"
        location.reload();
        }, 2440 );
      }
      $('.admin-welcome-wrap').click(function(){
        $('.admin-welcome-wrap').hide()
        })
    });
}
$scope.connectUser = function(newUser){
  mainService.connectUser(newUser).then(function(res){
      data = res.data
      $scope.currentUser = data;
      console.log($scope.currentUser.type)
    });
}
$scope.connectUser();

//Purchase functionality
$scope.purchaseType = function(type){
  console.log(type)
  data = {type: type}
  mainService.purchaseType(data).then(function(res){
    console.log("there and back", res.data)
    window.location = "/#/paymentInfo"
    })
}

// CMS functionality
$scope.saveCms = function(newCms){
console.log(newCms)
  mainService.saveCms(newCms).then(function(res){
    console.log("SUCCESS!!!", res.data)
    })
}
$scope.connectCMS = function(newUser){
  mainService.connectCMS(newUser).then(function(res){
      let cms = res.data;
      $scope.cms = cms
    });
}
$scope.connectCMS();
$scope.buildCMS = function(newcms){
  console.log(newcms)
}
$scope.test1 = 'adminTools.home'

//Users control
$scope.addToSubscript = function(subscriber){
  subscriber.type = 'user'
  mainService.addToSubscript(subscriber).then(function(res){
    });
}
  //Client control
  $scope.alert = undefined
  $scope.newClient = function(client){
    console.log("from controller", client)
    mainService.newClient(client).then(function(res){
      $scope.currentClient = res.data
      $scope.alert = "Success! Please accept the terms and conditions and select a payment method"
      $scope.currentClient.paymentReady = true;
      console.log($scope.currentClient)
      });
  }
  $scope.getClient = function(){
    mainService.getClient().then(function(res){
      $scope.currentClient = res.data
      console.log($scope.currentClient)
      });
  }
  $scope.getClient()
// Contact Box
$('#custom-contact-success').hide();
$scope.contactEmail = function(contactMail){
  console.log(contactMail)
  if(contactMail.name && contactMail.email){
    $('#custom-contact').hide();
  }
}
/*dropdowns*/
$('.dropdown-li div').hide()
  let shower = false
$('.dropdown-li').click(function(){
  if(shower === false){
    $('.dropdown-li div').show()
    shower = !shower
  }else if(shower === true){
    $('.dropdown-li div').hide()
    shower = !shower
  }
  })
//slideshow
$("#slideshow > div:gt(0)").hide();

//email
$scope.contactEmail = function(Mail){
  console.log(Mail)
  mainService.contactEmail(Mail).then(function(res){
    console.log(res)
    })
}



  })
