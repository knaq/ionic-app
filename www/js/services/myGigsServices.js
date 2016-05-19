angular.module('knaq.myGigsServices', [])
  .factory('MyGigsServices', function($firebaseArray, $firebaseObject, Auth) {

    var ref = new Firebase("https://knaq.firebaseio.com/gigs");

    return {

      getAll: function() {
        return $firebaseArray(ref).$loaded();
      },

      getInProgress: function() {
        console.log(Auth.getUser())
      },
      getApplied: function(key) {
        console.log(Auth.getUser())
      },
      getPosts: function(key) {
        console.log(Auth.getUser())
      }



    }



  });