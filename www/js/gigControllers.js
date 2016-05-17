angular.module('gig.controllers', ['gig.services', 'knaq.services'])

.controller('GigsCtrl', function($scope, GigFirebaseConnection, $state, $stateParams, Data) {

  $scope.gigs = {}

  GigFirebaseConnection.getAll().then(function(result) {

    $scope.gigs.allGigList = result;
    $scope.gigs.allGigList = $scope.gigs.allGigList.map(function(gig) {

      Data.getUser(gig.userId).then(function(userData) {
        gig['username'] = userData.username;
      })

      return gig;

    })


  })

})


.controller('GigDetailCtrl', function($scope, GigFirebaseConnection, $stateParams, Session) {

  console.log("Gigs detail running")

  console.log($stateParams.gigId);
  var gigLoadPromise = GigFirebaseConnection.get($stateParams.gigId);

  gigLoadPromise.then(function(result) {
    $scope.gig = result;
    console.log("Gig detail:")
    console.log($scope.gig);
  })


  $scope.applyBtnStates = [{
    label: "No function available",
    action: "doNothing()",
    style: "button button-block button-light"
  }, {
    label: "Apply",
    action: "apply()",
    style: "button button-block button-positive"
  }, {
    label: "Unapply",
    action: "unapply()",
    style: "button button-block button-assertive"
  }];


  $scope.checkApplyState = function() {
    if ($scope.gig == undefined || $scope.gig.applicants == undefined) {
      $scope.applyState = 0;
    } else if ($scope.gig.applicants.indexOf(Session.getUser()) == -1) {
      $scope.applyState = 1;
    } else {
      $scope.applyState = 2;
    }
  }

  $scope.apply = function() {
    var userId = Session.getUser();
    if ($scope.gig.applicants == undefined || $scope.gig.applicants == null) {
      $scope.gig.applicants = [userId];
      $scope.gig.$save();
    } else {
      $scope.gig.applicants.push(userId);
    }
  }

  $scope.unapply = function() {
    var userId = Session.getUser();
    var index = $scope.gig.applicants.indexOf(userId);
    while (index != -1) {
      $scope.gig.applicants.splice(index, 1);
      index = $scope.gig.applicants.indexOf(userId);
    }
    $scope.gig.$save();
  }


})

.controller('NewGigCtrl', function($scope, $state, $ionicHistory, GigFirebaseConnection, Session) {

  /*Todo: Connect  userId to firebase authentication data*/
  $scope.newGig = {}


  $scope.newGig.postGig = function() {
    GigFirebaseConnection.add($scope.newGig.title, $scope.newGig.pay, $scope.newGig.location, $scope.newGig.description, Session.getUser());
    $scope.newGig.title = ""
    $scope.newGig.pay = ""
    $scope.newGig.location = ""
    $scope.newGig.description = ""
    $state.go('tab.gigs');
  }
});