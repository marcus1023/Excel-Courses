angular.module('excelCourses').controller('paypal', function(mainService, $scope, $interval, $compile, $state  ){

paypal.Button.render({

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

 }, '#paypal-button');


});
