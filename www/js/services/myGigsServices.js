angular.module('knaq.myGigsServices', [])
  .factory('MyGigsServices', function($q, $firebaseArray, $firebaseObject, Auth) {

    var ref = new Firebase("https://knaq.firebaseio.com/gigs");

    return {

      getAll: function() {
        return $firebaseArray(ref).$loaded();
      },

      getInProgress: function() {
        return this.getAll().then(function(gigs) {
          return gigs.filter(function(gig) {
            if (gig.acceptedCandidate == Auth.getUser() && gig.completed == "false") {
              return gig
            }

          }, function(error) {
            return error;
          })
        })

      },
      getApplied: function() {

        var deferred = $q.defer();

        this.getAll().then(
          function(gigs) {

            var appliedGigs = gigs.filter(function(gig) {


              if (gig.hasOwnProperty('applicants')) {

                if (gig.applicants.hasOwnProperty(Auth.getUser())) {

                  return gig;
                }

              }


            });

            deferred.resolve(appliedGigs)

          },
          function(error) {
            deferred.reject(error)
          }
        );

        return deferred.promise

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