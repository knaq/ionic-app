angular.module('knaq.dataServices', [])

.factory('Data', function($firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://knaqapp.firebaseio.com/users");

    return {

        getAllUsers: function() {

            return $firebaseArray(ref).$loaded();

        },
        getUser: function(userid) {

            return $firebaseObject(ref.child(userid)).$loaded();

        }

    }

});