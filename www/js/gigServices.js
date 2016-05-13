angular.module('gig.services', ["firebase"])
  .service('GigFirebaseConnection', function ($firebaseArray, $firebaseObject) {
    this.firebaseReference = new Firebase("https://knaq.firebaseio.com/gigs");

    this.getAll = function () {
      var gigs = $firebaseArray(this.firebaseReference);
      return gigs.$loaded();
    };

    this.get = function (key) {
      return $firebaseObject(this.firebaseReference.child(key)).$loaded();
    }

    this.add = function (title, pay, location, description, userId) {
      var gigs = $firebaseArray(this.firebaseReference);
      gigs.$add({
        title: title,
        pay: pay,
        location: location,
        description: description,
        userId: userId
      });
    };
  });