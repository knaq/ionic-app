angular.module('gig.services', [])
  .factory('GigFirebaseConnection', function($firebaseArray, $firebaseObject) {

    var ref = new Firebase("https://knaq.firebaseio.com/gigs");

    return {

      getAll: function() {
        return $firebaseArray(ref).$loaded();
      },

      get: function(key) {
        console.log(key);
        return $firebaseObject(ref.child(key)).$loaded();
      },

      add: function(title, pay, location, description, userId) {
        var gigs = $firebaseArray(ref);
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