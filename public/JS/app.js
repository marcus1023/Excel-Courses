angular.module('excelCourses',  ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('home',{
          url:'/home',
          templateUrl: "./JS/templates/home-tmpl.html",
          controller: "mainController"
      })
      .state('home.select',{
          url:'/select',
          templateUrl: "./JS/templates/popups/selections-pop.html",
          controller: "mainController"
      })
      .state('about',{
          url:'/about',
          templateUrl: "./JS/templates/about.html",
          controller: "mainController"
      })
      .state('testimonials',{
          url:'/testimonials',
          templateUrl: "./JS/templates/testimonials.html",
          controller: "mainController"
      })
      .state('contact',{
          url:'/contact',
          templateUrl: "./JS/templates/contact.html",
          controller: "mainController"
      })
      .state("services",{
          url:'/services',
          templateUrl: "./JS/templates/services.html",
          controller: "mainController"
      })
      .state("services.course",{
          url:'/course',
          templateUrl: "./JS/templates/popups/course-pop.html",
          controller: "mainController"
      })
      .state("services.mentor",{
          url:'/mentor',
          templateUrl: "./JS/templates/popups/mentor-pop.html",
          controller: "mainController"
      })
      .state("services.consult",{
          url:'/consult',
          templateUrl: "./JS/templates/popups/consult-pop.html",
          controller: "mainController"
      })
      .state("services.coursesAvailable",{
          url:'/coursesAvailable',
          templateUrl: "./JS/templates/popups/courses-available.html",
          controller: "mainController"
      })
      .state("excelTips",{
          url:'/excelTips',
          templateUrl: "./JS/templates/excelTips.html",
          controller: "mainController"
      })
      .state("excelTips.subscribe",{
          url:'/subscribe',
          templateUrl: "./JS/templates/popups/email-pop.html",
          controller: "mainController"
      })
      .state("signin",{
          url:'/signin',
          templateUrl: "./JS/templates/signin.html",
          controller: "mainController"
      })
      .state("adminTools",{
          url:'/adminTools',
          templateUrl: "./JS/templates/adminTools/admin-home.html",
          controller: "mainController"
      })
      .state("adminTools.event",{
          url:'/event',
          templateUrl: "./JS/templates/popups/event-pop.html",
          controller: "mainController"
      })
      //payments
      .state("checkout",{
          url:'/checkout',
          templateUrl: "./JS/templates/checkout.html",
          controller: "mainController"
      })
      .state("paymentInfo",{
          url:'/paymentInfo',
          templateUrl: "./JS/templates/paymentinfo.html",
          controller: "mainController"
      })
      .state("paymentInfo.terms",{
          url:'/terms',
          templateUrl: "./JS/templates/popups/termsOfService.html",
          controller: "mainController"
      })
      .state("paymentFinal",{
          url:'/paymentFinal',
          templateUrl: "./JS/templates/paymentfinal.html",
          controller: "mainController"
      })
      //CMS input templates
      .state("adminTools.home",{
          url:'/cmsHome',
          templateUrl: "./JS/templates/adminTools/cmsinput/cms-home.html",
          controller: "mainController"
      })
      .state("adminTools.services",{
          url:'/cmsServices',
          templateUrl: "./JS/templates/adminTools/cmsinput/cms-services.html",
          controller: "mainController"
      })
      .state("adminTools.terms",{
          url:'/terms',
          templateUrl: "./JS/templates/adminTools/cmsinput/cms-terms.html",
          controller: "mainController"
      })
      .state("adminTools.excelTips",{
          url:'/excelTips',
          templateUrl: "./JS/templates/adminTools/cmsinput/cms-excelTips.html",
          controller: "mainController"
      })
      .state("adminTools.about",{
          url:'/cmsabout',
          templateUrl: "./JS/templates/adminTools/cmsinput/cms-about.html",
          controller: "mainController"
      })
      .state("adminTools.testys",{
          url:'/cmstestys',
          templateUrl: "./JS/templates/adminTools/cmsinput/cms-testimonials.html",
          controller: "mainController"
      })
      .state("adminTools.contact",{
          url:'/contact',
          templateUrl: "./JS/templates/adminTools/cmsinput/cms-contact.html",
          controller: "mainController"
      })
      //payments STUFF
      .state("stripePayment",{
          url:'/stripePayment',
          templateUrl: "./JS/templates/stripePayments.html",
          controller: "mainController"
      })


        $urlRouterProvider
        .when('/', '/select')
            .otherwise('/');
    });
