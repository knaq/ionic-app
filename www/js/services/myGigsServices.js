angular.module('knaq.myGigsServices', [])
  .factory('MyGigsServices', function($firebaseArray, $firebaseObject, Auth) {

    var ref = new Firebase("https://knaq.firebaseio.com/gigs");

    return {

      getAll: function() {
        return $firebaseArray(ref).$loaded();
      },

      getInProgress: function() {
        return this.getAll().then(function(gigs) {
          return gigs.filter(function(gig) {
            if (gig.acceptedCandidate == Auth.getUser() && gig.completed=="false") {
              return gig
            }

          }, function(error) {
            return error;
          })
        })

      },
      getApplied: function() {
        return this.getAll().then(function(gigs) {
          return gigs.filter(function(gig) {
            if (gig.applicants.indexOf(Auth.getUser())) {
              return gig
            }

          }, function(error) {
            return error;
          })
        })
      },
      getPosts: function() {

        return this.getAll().then(function(gigs) {
          return gigs.filter(function(gig) {
            if (gig.userId == Auth.getUser()) {
              return gig
            }

          }, function(error) {
            return error;
          })
        })

      }

    }



  });