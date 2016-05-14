angular.module('gig.services', [])
  .factory('GigFirebaseConnection', function($firebaseArray, $firebaseObject) {

    var firebaseReference = new Firebase("https://knaq.firebaseio.com/gigs");

    return {

      getAll: function() {
        return $firebaseArray(firebaseReference).$loaded();
      },

      get: function(key) {
        console.log(key);
        return $firebaseObject(firebaseReference.child(key)).$loaded();
      },

      add: function(title, pay, location, description, userId) {
        var gigs = $firebaseArray(firebaseReference);
        gigs.$add({
          title: title,
          pay: pay,
          location: location,
          description: description,
          userId: userId
        });
      }


    }



  });