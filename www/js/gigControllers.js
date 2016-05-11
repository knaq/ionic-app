angular.module('gig.controllers', ['gig.services'])

.controller('GigsCtrl', function(GigFirebaseConnection, $state, $stateParams) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  this.gigLoadPromise = GigFirebaseConnection.getAll();
  this.gigs = null;

  this.gigLoadPromise.then(function(result) {
    this.gigs = result;
    
  }.bind(this), function(error) {
    alert("Couldn't load gig: " + error);  
  })
  
  this.createNewGig = function() {
    $state.go('tab.gig-new');
  }
})

.controller('GigDetailCtrl', function(GigFirebaseConnection, $stateParams) {
  this.gigLoadPromise = GigFirebaseConnection.get($stateParams.gigId);
  this.gig = null;
  
  this.gigLoadPromise.then(function(result) {
    this.gig = result;
  }.bind(this), function(error) {
    alert("Couldn't load the gig: " + error);
  })
  
})

.controller('NewGigCtrl', function($ionicHistory, GigFirebaseConnection) {
 
  /*Todo: Connect  userId to firebase authentication data*/ 
  this.postGig = function() {
    GigFirebaseConnection.add(this.title, this.pay, this.location, this.description, "954a5f56-7fdb-4039-a9a1-e5afa2a5e338");
    $ionicHistory.goBack();  
  }
});