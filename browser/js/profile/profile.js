app.config(function($stateProvider) {
  $stateProvider
    .state('profile', {
      url: '/user/user/profile',
      templateUrl: 'js/profile/profile.html',
      controller: 'ProfileCtrl'
    })
});

app.controller('ProfileCtrl', function($scope, $state, $stateParams, AuthService, ProfileFactory, TransactionFactory) {

  var User = function() {
    AuthService.getLoggedInUser()
      .then(function(user) {
        return ProfileFactory.getUser(user)
      })
      .then(function(response) {
        $scope.user = response
        console.log(response);
        return response
      })
  }

  User()

  $scope.giveProductRating = function(instructorId, transactionId, rating) {
    InstructorFactory.makeRating(instructorId, rating)
      .then(function(instructor) {
        console.log(instructor);
      })
    TransactionFactory.makeRating(transactionId, rating)
      .then(function(transaction) {
        console.log(transaction);
        User();
      });
  }
})