angular.module('knaq.gigServices', [])
  .factory('GigFirebaseConnection', function($firebaseArray, $firebaseObject, $q) {

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
      addApplicant: function(gigId, userId) {
        ref.child(gigId).child('applicants').child(userId).set({
          appliedAt: Firebase.ServerValue.TIMESTAMP
        })
      },
      hireFromApplicants: function (gigId, userId) {
        var acceptedCandidate = $firebaseObject(ref.child(gigId).child('acceptedCandidate'))
        acceptedCandidate.$value = userId;
        return acceptedCandidate.$save();
      },
      removeAllApplicants: function (gigId) {

        return $firebaseObject(ref.child(gigId).child('applicants')).$remove()
        
      },
      removeAcceptedApplicant: function (gigId) {
        return $firebaseObject(ref.child(gigId).child('acceptedCandidate')).$remove()
      },
      removeApplicant: function(gigId, userId) {
        
        ref.child(gigId).child('applicants').child(userId).remove();
        
      },
      delete: function (gigId) {
        return $firebaseObject(ref.child(gigId)).$remove();
      },

      getApplicants: function(gigId, userId) {
        return $firebaseArray(ref.child(gigId).child('applicants')).$loaded()
      },

      isApplied:  function(gigId, userId) {
        var deferred = $q.defer();

        $firebaseArray(ref.child(gigId).child('applicants')).$loaded().then(function (applicants) {
          deferred.resolve(applicants.$indexFor(userId))
        },function (error) {
          deferred.reject(error);
        })

        return deferred.promise
      }





    }



  });