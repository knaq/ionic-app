angular.module('gig.controllers', ['gig.services'])

.controller('GigsCtrl', function(GigFirebaseConnection, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  this.gigs = GigFirebaseConnection.getAll();
  
  this.createNewGig = function() {
    $state.go('tab.gig-new');
  }
})

.controller('GigDetailCtrl', function(GigFirebaseConnection) {
  this.gigs = GigFirebaseConnection.get();
})

.controller('NewGigCtrl', function($ionicHistory, GigFirebaseConnection) {
 
  /*Todo: Connect  userId to firebase authentication data*/ 
  this.postGig = function() {
    GigFirebaseConnection.add(this.title, this.pay, this.location, this.description, "954a5f56-7fdb-4039-a9a1-e5afa2a5e338");
    $ionicHistory.goBack();  
  }
});