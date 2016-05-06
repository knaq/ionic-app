angular.module('gig.controllers', [])

.controller('GigsCtrl', function($scope, Gigs, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.gigs = Gigs.all();
  $scope.remove = function(gig) {
    Gigs.remove(gig);
  };
  
  $scope.createNewGig = function() {
    $state.go('tab.gig-new');
  }
})

.controller('GigDetailCtrl', function($scope, $stateParams, Gigs) {
  $scope.gig = Gigs.get($stateParams.gigId);
})

.controller('NewGigCtrl', function($scope, $state, $ionicHistory) {
  $scope.postGig = function() {
    $ionicHistory.goBack();  
  }
});