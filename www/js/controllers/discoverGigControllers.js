angular.module('knaq.gigControllers',[])

.controller('DiscoverGigsCtrl', function($scope, GigFirebaseConnection, $state, $stateParams, Data) {

  $scope.gigs = {}

  GigFirebaseConnection.getAll().then(function(result) {


    var addUsername = function() {
      $scope.gigs.allGigList = $scope.gigs.retrievedGigList.map(function(gig) {

        Data.getUser(gig.userId).then(function(userData) {
          gig['username'] = userData.username;
        })

        return gig;

      })
    }

    $scope.gigs.retrievedGigList = result;
    addUsername()

    result.$watch(function() {
      addUsername();
    })

  })

})


.controller('GigDetailCtrl', function($scope, GigFirebaseConnection, $stateParams, Auth) {

  $scope.gigDetail = {}

  var gigLoadPromise = GigFirebaseConnection.get($stateParams.gigId);

  gigLoadPromise.then(function(result) {
    $scope.gigDetail.gig = result;
    console.log("Gig detail:")
    console.log($scope.gigDetail.gig);
  })

  $scope.gigDetail.applyBtnStates = [{
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


  $scope.gigDetail.checkApplyState = function() {
    if ($scope.gigDetail.gig == undefined || $scope.gigDetail.gig.applicants == undefined) {
      $scope.gigDetail.applyState = 0;
    } else if ($scope.gigDetail.gig.applicants.indexOf(Auth.getUser()) == -1) {
      $scope.gigDetail.applyState = 1;
    } else {
      $scope.gigDetail.applyState = 2;
    }
  }

  $scope.gigDetail.apply = function() {
    var userId = Auth.getUser();

    if ($scope.gigDetail.gig.applicants == undefined || $scope.gigDetail.gig.applicants == null) {
      $scope.gigDetail.gig.applicants = [userId];
      $scope.gigDetail.gig.$save();
    } else {
      $scope.gigDetail.gig.applicants.push(userId);
      $scope.gigDetail.gig.$save();
    }
  }

  $scope.gigDetail.unapply = function() {
    var userId = Auth.getUser();
    var index = $scope.gigDetail.gig.applicants.indexOf(userId);
    while (index != -1) {
      $scope.gigDetail.gig.applicants.splice(index, 1);
      index = $scope.gigDetail.gig.applicants.indexOf(userId);
    }
    $scope.gigDetail.gig.$save();
  }


})

.controller('NewGigCtrl', function($scope, $state, $ionicHistory, GigFirebaseConnection, Auth) {

  /*Todo: Connect  userId to firebase authentication data*/
  $scope.newGig = {}


  $scope.newGig.postGig = function() {
    GigFirebaseConnection.add($scope.newGig.title, $scope.newGig.pay, $scope.newGig.location, $scope.newGig.description, Auth.getUser());
    $scope.newGig.title = ""
    $scope.newGig.pay = ""
    $scope.newGig.location = ""
    $scope.newGig.description = ""
    $state.go('tab.discover-gigs');
  }
});