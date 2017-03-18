angular.module('excelCourses').controller('mainController', function(mainService, $scope, $interval, $compile, $state  ){

$scope.slotsAvailable = 5;
$scope.coursePrice = 600;
$scope.mentorPrice = 200;
$scope.consultancyPrice = 250;


$scope.earlyBirdTimerD = 30
$scope.earlyBirdTimerH = 30
$scope.earlyBirdTimerM = 60
$scope.earlyBirdTimerS = 13
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
        location.reload();
      }
    }
  }, 1500);
$scope.getebTimer = function(){
  mainService.getebTimer().then(function(res){
    let ebTimer = res.data
    $scope.earlyBirdTimerD = ebTimer.days - 30
    $scope.earlyBirdTimerH = ebTimer.hours
    $scope.earlyBirdTimerM = ebTimer.minutes
    })
}
$scope.getebTimer()


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
$('.areallybadidea').click(function(){
  $('.areallybadidea').hide()
  })
//Purchase functionality
$scope.purchaseType = function(type){
  mainService.purchaseType(type).then(function(res){
    location.reload();
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
    $scope.cmsConnect()
    })
}

//Testimonials
$scope.saveNewTesty = function(newTesty){
  mainService.saveNewTesty(newTesty).then(function(res){
    })
}
$scope.getTestys = function(){
  mainService.getTestys().then(function(res){
    $scope.allTestimonials = res.data
    })
}
$scope.getTestys();

//events control
$scope.manageClass = function(id){
  console.log(id)
  console.log($scope.events)
  for(let i = 0; i < $scope.events.length; i++){
    if($scope.events[i].id === id){
      $scope.eventToManage = $scope.events[i]
    }
}
console.log($scope.eventToManage)
}
$scope.getAllevents = function(){
  mainService.getAllevents().then(function(res){
    $scope.events = []
    $scope.eventsShow = []
    for(let i = 0; i < res.data[0].length; i++){
      $scope.events.push(res.data[0][i])
    }
    for(let i = 0; i < res.data[1].length; i++){
      $scope.eventsShow.push(res.data[1][i])
    }
    })
}
$scope.getAllevents()

$scope.newCourseMonth = [{name:'January', number: 1},{name:'February', number: 2},{name:'March', number: 4},{name:'April', number: 4},{name:'May', number: 5},{name:'June', number: 6}, {name:'July', number: 7}, {name:'August', number: 8}, {name:'September', number: 9}, {name:'October', number: 10}, {name:'November', number: 11}, {name:'December', number: 12}]
$scope.newCourseDay = [{day:1},{day:2},{day:3},{day:4},{day:5},{day:6},{day:7},{day:8},{day:9},{day:10},{day:11},{day:12},{day:13},{day:14},{day:15},{day:16},{day:17},{day:18},{day:19},{day:20},{day:21},{day:22},{day:23},{day:24},{day:25},{day:26},{day:27},{day:28},{day:29},{day:30},{day:31}]
$scope.newCourseYear = [{year: 2017},{year: 2018},{year: 2019},{year: 2020}]
$scope.newCourseMonth2 = [{name:'January', number: 1},{name:'Feburay', number: 2},{name:'March', number: 4},{name:'April', number: 4},{name:'May', number: 5},{name:'June', number: 6}, {name:'July', number: 7}, {name:'August', number: 8}, {name:'September', number: 9}, {name:'October', number: 10}, {name:'November', number: 11}, {name:'December', number: 12}]
$scope.newCourseDay2 = [{day:1},{day:2},{day:3},{day:4},{day:5},{day:6},{day:7},{day:8},{day:9},{day:10},{day:11},{day:12},{day:13},{day:14},{day:15},{day:16},{day:17},{day:18},{day:19},{day:20},{day:21},{day:22},{day:23},{day:24},{day:25},{day:26},{day:27},{day:28},{day:29},{day:30},{day:31}]
$scope.newCourseYear2 = [{year: 2017},{year: 2018},{year: 2019},{year: 2020}]
$scope.addPeople = [{number: 1},{number: 2},{number: 3},{number: 4},{number: 5},{number: 6},{number: 8},{number: 9}]
$('#event-submit').hide()
$('#event-submit-back').hide()
$scope.createEvent = function(newEvent){
  $('#event-submit').hide()
  $('#event-submit-back').hide()
  mainService.createEvent(newEvent).then(function(res){
      location.reload();
    })
}
$scope.revealEvent = function(){
  $('#event-submit').show()
  $('#event-submit-back').show()
}
$scope.selectCourse = function(courseId){
  id = {id: courseId}
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
  $scope.activateButtons = false
  $scope.revealButtons = function(){
      $scope.activateButtons = true
      console.log($scope.runningTotal)
      data = {cohort:$scope.currentClient.cohort , id: $scope.currentClient.userid, name: $scope.currentClient.info.pasportName, fullPayment:$scope.runningTotal}
      let Emaildata = {currentClient:$scope.currentClient, total: $scope.runningTotal, cohort:$scope.currentClient.cohort}
      mainService.confirmCohort(data).then(function(res){
        console.log(res.data)
        })
      mainService.sendRegisteredEmail(Emaildata).then(function(res){
        console.log('email send')
        })
  }
  $scope.newClient = function(client){
    client.cohort = $scope.currentClient.cohort
    if(client.address && client.birthDate && client.email && client.pasport && client.pasportName && client.phone && client.postalCode && client.preferName){
      console.log(client)
      mainService.newClient(client).then(function(res){
        $scope.currentClient = res.data
        console.log($scope.currentClient)
        $scope.alert = "Success! Please accept the terms and conditions and select a payment method"
       });
    }
  }
  $scope.getClient = function(){
    mainService.getClient().then(function(res){
      $scope.currentClient = res.data
      $scope.runningTotal = 0;
      $scope.stripeTotal = 0;
      if($scope.currentClient.purchaseType){
        for(var i = 0; i < $scope.currentClient.purchaseType.length; i++){
          $scope.runningTotal += $scope.currentClient.purchaseType[i].price
          if($scope.currentClient.savingsType[0]){
            $scope.runningTotal += $scope.currentClient.savingsType[i].price
          }
          console.log($scope.runningTotal)
          mainService.runningTotal({total:$scope.runningTotal}).then(function(res){
            })
        }
        $scope.stripeTotal = $scope.runningTotal * 100
        console.log($scope.currentClient)
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
$scope.addPeopleToClass = function(data){
  let addingData = {number:data.number,cohort:$scope.currentClient.cohort, userid: $scope.currentClient.userid, name: $scope.currentClient.info.pasportName}
  mainService.addPeopleToClass(addingData).then(function(res){
    $scope.currentClient = res.data
    console.log($scope.currentClient)
    location.reload();

    })
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

//paypalobjects
/*paypal.Button.render({

     env: 'sandbox', // Optional: specify 'sandbox' environment

     client: {
         sandbox:    'AUVKm6PaBOwm5jOyRasoKwxEIfGHFuN2BjYeneEXJa3ci7zw8UIDKcBd-smVq_ANq17KwYFkE7icLUNF',
         production: 'xxxxxxxxx'
     },

     payment: function() {

         var env    = this.props.env;
         var client = this.props.client;

         return paypal.rest.payment.create(env, client, {
             transactions: [
                 {
                     amount: { total: $scope.runningTotal, currency: 'USD' }
                 }
             ]
         });
     },

     commit: true, // Optional: show a 'Pay Now' button in the checkout flow

     onAuthorize: function(data, actions) {

         // Optional: display a confirmation page here

         return actions.payment.execute().then(function() {
             // Show a success page to the buyer
         });
     }

 }, '#paypal-button');*/

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
    amount: $scope.runningTotal * 100
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close();
});

  })
