angular.module('knaq.gigServices', [])
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
        console.log(title)
        console.log(pay)
        console.log(location)
        console.log(description)
        console.log(userId)

        var gigs = $firebaseArray(ref);
        gigs.$add({
          title: title,
          pay: pay,
          location: location,
          description: description,
          userId: userId
        });
      },

      addApplicant: function (gigId, userId) {
         return $firebaseArray(ref.child(gigId).child('applicants')).$add(userId)
      }


    }



  });