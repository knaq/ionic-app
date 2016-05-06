angular.module('knaq.services', [])

.factory('MyAuth', function($firebaseArray) {

  var ref = new Firebase('https://knaq.firebaseio.com');

  var userService = {

    addUser: function(email, password) {
      ref.createUser({
        email: email,
        password: password
      }, function(error, userData) {
        if (error) {

          console.log("Error creating user:", error);

        } else {

          console.log("Successfully created user account with uid:", userData.uid);

        }
      });
    },
    signInUser: function(email, password) {

      ref.authWithPassword({
        email: email,
        password: password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
      
    }

  }

  return userService;

});