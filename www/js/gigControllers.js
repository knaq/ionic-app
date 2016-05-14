angular.module('gig.controllers', ['gig.services', 'knaq.services'])

.controller('GigsCtrl', function($scope, GigFirebaseConnection, $state, $stateParams, Data) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  console.log("Gigs running")


  GigFirebaseConnection.getAll().then(function(result) {

    $scope.gigs = result;
    $scope.gigs = $scope.gigs.map(function(gig) {

      Data.getUser(gig.userId).then(function(userData) {
        console.log(userData);
        gig['username'] = userData.username;
      })

      return gig;

    })


  })

  $scope.getUserNameFromId = function(userId) {
    var posterLoadPromise = Data.getUser(user);
    posterLoadPromise.then(function() {

    })
  }

  $scope.createNewGig = function() {
    $state.go('tab.gig-new', {
      location: false
    });
  }

  $scope.viewDetail = function(userId) {

    $state.go('tab.gig-detail', {
      gigId: userId
    }, {
      location: false
    });

  }

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

.controller('NewGigCtrl', function($scope, $ionicHistory, GigFirebaseConnection, Session) {

  /*Todo: Connect  userId to firebase authentication data*/
  $scope.postGig = function() {
    GigFirebaseConnection.add($scope.title, $scope.pay, $scope.location, $scope.description, Session.getUser());
    $ionicHistory.goBack();
    //$state.go('tab.gigs');
  }
});