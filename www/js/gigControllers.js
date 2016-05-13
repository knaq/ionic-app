angular.module('gig.controllers', ['gig.services', 'knaq.services'])

.controller('GigsCtrl', function(GigFirebaseConnection, $state, $stateParams, Data) {
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
  
  this.getUserNameFromId = function(userId) {
    var posterLoadPromise = Data.getUser(user);
    posterLoadPromise.then(function() {
      
    })
  }
  
  this.createNewGig = function() {
    $state.go('tab.gig-new');
  }
})

.controller('GigDetailCtrl', function(GigFirebaseConnection, $stateParams, Session) {
  this.gigLoadPromise = GigFirebaseConnection.get($stateParams.gigId);
  this.gig = null;
  
  this.applyBtnStates = [{
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
  
  
  this.checkApplyState = function() {
    if (this.gig == undefined || this.gig.applicants == undefined) {
      this.applyState = 0;
    }
    else if (this.gig.applicants.indexOf(Session.getUser()) == -1) {
      this.applyState = 1;
    } else {
      this.applyState = 2;
    }
  }
  
  this.apply = function() {
    var userId = Session.getUser();
    if (this.gig.applicants == undefined || this.gig.applicants == null) {
      this.gig.applicants = [userId];
      this.gig.$save();
    } else {
      this.gig.applicants.push(userId);
      this.gig.$save();
    }
  }
  
  this.unapply = function() {
    var userId = Session.getUser();
    var index = this.gig.applicants.indexOf(userId); 
    while(index != -1) {
      this.gig.applicants.splice(index, 1);
      index = this.gig.applicants.indexOf(userId);
    }
    this.gig.$save();
  }
  
  this.gigLoadPromise.then(function(result) {
    this.gig = result;
    console.log(this.gig);
  }.bind(this), function(error) {
    alert("Couldn't load the gig: " + error);
  });
})

.controller('NewGigCtrl', function($ionicHistory, GigFirebaseConnection, Session) {
 
  /*Todo: Connect  userId to firebase authentication data*/ 
  this.postGig = function() {
    GigFirebaseConnection.add(this.title, this.pay, this.location, this.description, Session.getUser());
    $ionicHistory.goBack();  
  }
});