angular.module('gig.services', ["firebase"])
.service('GigFirebaseConnection', function($firebaseArray) {
  this.firebaseReference = new Firebase("https://knaq.firebaseio.com/gigs");
  this.gigs = $firebaseArray(this.firebaseReference);
  console.log(this.gigs);
  
  this.getAll = function() {
    return this.gigs;
  };
  
  this.get = function(key) {
    return this.gigs.$getRecord(key);
  };
  
  this.remove = function(record) {
    return this.gigs.$remove(record);
  };
  
  this.add = function(title, pay, location, description, userId) {
     this.gigs.$add({
       title: title,
       pay: pay,
       location: location,
       description: description,
       userId: userId
     });
  };
  
  this.get = function() {
    this.gigs
  };
});