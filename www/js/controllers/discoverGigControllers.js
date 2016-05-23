angular.module('knaq.discoverGigsControllers',[])

.controller('DiscoverGigsCtrl', function($scope, GigFirebaseConnection, $state, $stateParams, Data, Auth) {

  var userId = Auth.getUser();
  $scope.gigs = {}

  $scope.gigs.loadingData = true;

  GigFirebaseConnection.getAll().then(function(result) {

    var addMoreFields = function() {
      $scope.gigs.allGigList = $scope.gigs.retrievedGigList.map(function(gig) {

        if(gig.userId ==userId){
          gig.mypost=true;
        }

        Data.getUser(gig.userId).then(function(userData) {
          gig['firstname'] = userData.firstname;
          gig['lastname'] = userData.lastname;
        })

        var isAppliedPromise = GigFirebaseConnection.isApplied(gig.$id, userId)

        isAppliedPromise.then(function (result) {
          
          if(result == -1){
            gig['applied'] = false;
          }else{
            gig['applied'] = true;
          }

        });

        return gig;

      })
    }
    $scope.gigs.loadingData = false;

    $scope.gigs.retrievedGigList = result;
    addMoreFields()

    result.$watch(addMoreFields)

  })

})


.controller('GigDetailCtrl', function($scope, GigFirebaseConnection, $stateParams, $state, Auth) {

  
  var userId = Auth.getUser();
  var paramGigId = $stateParams.gigId;


  $scope.gigDetail = {}
  $scope.gigDetail.isMyOwnPost = false;

  var isAppliedPromise = GigFirebaseConnection.isApplied(paramGigId, userId)

  isAppliedPromise.then(function (result) {
    
    if(result == -1){
      $scope.gigDetail.applied = false;
    }else{
      $scope.gigDetail.applied = true;
    }
    console.log($scope.gigDetail.applied)
  });

  

  var gigLoadPromise = GigFirebaseConnection.get(paramGigId);

  gigLoadPromise.then(function(result) {
    $scope.gigDetail.gig = result;

    if($scope.gigDetail.gig.userId==Auth.getUser()){
      $scope.gigDetail.isMyOwnPost = true;
    }
    console.log("Gig detail:")
    console.log($scope.gigDetail.gig);
  })


  $scope.gigDetail.apply = function() {
    
    GigFirebaseConnection.addApplicant(paramGigId, userId);

    $scope.gigDetail.applied = true;

    $state.go('tab.discover-gigs')


  }

  $scope.gigDetail.unapply = function() {

    GigFirebaseConnection.removeApplicant(paramGigId, userId);

    $scope.gigDetail.applied = false;

    $state.go('tab.discover-gigs')

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