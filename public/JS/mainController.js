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
    });
}
$scope.connectUser();

//Purchase functionality
$scope.purchaseType = function(type){
  console.log('controller',type)
  mainService.purchaseType(type).then(function(res){
    console.log("there and back", res.data)
    })
}

// CMS functionality
$scope.cmsConnect = function(){
  mainService.cmsConnect().then(function(res){
    $scope.cms = res.data
    })
}
$scope.cmsConnect();
$scope.saveCms = function(newCms){
  console.log(newCms)
  mainService.saveCms(newCms).then(function(res){
    console.log("got there and back")
    $scope.cmsConnect()
    })
}
//events control
$scope.getAllevents = function(){
  mainService.getAllevents().then(function(res){
    $scope.events = []
    for(let i = 0; i < res.data.length; i++){
      $scope.events.push(res.data[i])
    }
    console.log(res.data)
    console.log($scope.events)
    })
}
$scope.getAllevents()
$scope.newCourseMonth = [{name:'January', number: 1},{name:'Feburay', number: 2},{name:'March', number: 4},{name:'April', number: 4},{name:'May', number: 5},{name:'June', number: 6}, {name:'July', number: 7}, {name:'August', number: 8}, {name:'September', number: 9}, {name:'October', number: 10}, {name:'November', number: 11}, {name:'December', number: 12}]
$scope.newCourseDay = [{day:1},{day:2},{day:3},{day:4},{day:5},{day:6},{day:7},{day:8},{day:9},{day:10},{day:11},{day:12},{day:13},{day:14},{day:15},{day:16},{day:17},{day:18},{day:19},{day:20},{day:21},{day:22},{day:23},{day:24},{day:25},{day:26},{day:27},{day:28},{day:29},{day:30},{day:31}]
$scope.newCourseYear = [{year: 2017},{year: 2018},{year: 2019},{year: 2020}]
$('#event-submit').hide()
$('#event-submit-back').hide()
$scope.createEvent = function(newEvent){
  $('#event-submit').hide()
  $('#event-submit-back').hide()
  console.log(newEvent)
  mainService.createEvent(newEvent).then(function(res){
      console.log(res.data)
      location.reload();
    })
}
$scope.revealEvent = function(){
  $('#event-submit').show()
  $('#event-submit-back').show()
}
$scope.selectCourse = function(courseId){
  id = {id: courseId}
  console.log(id)
  mainService.selectCourse(id).then(function(res){

    })
}
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
      console.log("hello from service",$scope.currentClient)
      });
  }
  $scope.getClient = function(){
    mainService.getClient().then(function(res){
      $scope.currentClient = res.data
      $scope.runningTotal = 0;
      $scope.stripeTotal = 0;
      if($scope.currentClient){
        for(var i = 0; i < $scope.currentClient.purchaseType.length; i++){
          $scope.runningTotal += $scope.currentClient.purchaseType[i].price
          mainService.runningTotal({total:$scope.runningTotal}).then(function(res){
            console.log("hello",res.data)
            })
        }
        $scope.stripeTotal = $scope.runningTotal * 100
        console.log('$scope.stripeTotal',$scope.stripeTotal)
      }
      });
  }
  $scope.getClient()
  $scope.termsOfService = function(a){
    if(a == "Agree"){
      $scope.currentClient.termsAgreed = true;
      mainService.termsOfService().then(function(res){
        })
    }
  }
// Contact Box
$('#custom-contact-success').hide();
$scope.contactEmail = function(contactMail){
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
  mainService.contactEmail(Mail).then(function(res){
    })
}

// Stripe

var handler = StripeCheckout.configure({
  key: 'pk_test_yBTdwsi8MZx1RLopICuaVcPc',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    data = {stripeToken: token.id, ammount: runningTotal}
    mainService.stripePayment(data).then(function(res){
      console.log("stripe connected", res.data)
      })
  }
});

$('#customButton').click(function(e) {
  // Open Checkout with further options:
  handler.open({
    name: 'Excel Infinity',
    description: 'Excel Services',
    amount: $scope.stripeTotal
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close();
});

  })
