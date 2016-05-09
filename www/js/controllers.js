angular.module('knaq.controllers', [])

  .controller('ProfileCtrl', function ($scope, $state, MyAuth, $firebaseAuth) {

    var ref = new Firebase("https://knaq.firebaseio.com/users");

    var userID = $state.params.userSignedInID
    $scope.signedInUser = null;
    ref.on("value", function (snapshot) {
      console.log(userID);
      $scope.signedInUser = snapshot.val()[userID]
      console.log($scope.signedInUser)
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


  })
  .controller('SignUpCtrl', function ($scope, $firebaseObject, $state, MyAuth) {

    $scope.signup = {};

    $scope.reset = function () {

      $scope.signup.email = "";
      $scope.signup.password = "";
      $scope.signup.passwordConfirmation = "";
      $scope.signup.username = "";

    }
    $scope.signUp = function () {

      var ref = new Firebase("https://knaq.firebaseio.com");
      var refToUsers = ref.child('users');

      ref.createUser({
        email: $scope.signup.email,
        password: $scope.signup.password
      }, function (error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);

          refToUsers.child(userData.uid).set({
            username: $scope.signup.username,
            email: $scope.signup.email,
            online: 'true'
          });
        }
      });

    }
  })

  .controller('SignInCtrl', function ($scope, $state, MyAuth) {

    var tmpUser = {};

    $scope.signin = {};

    $scope.reset = function () {

      $scope.signin.email = "";
      $scope.signin.password = "";

    }
    $scope.signIn = function () {

      var ref = new Firebase("https://knaq.firebaseio.com");

      ref.authWithPassword({
        email: $scope.signin.email,
        password: $scope.signin.password
      }, function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $state.go('tab.profile', {
            userSignedInID: authData.uid
          });
        }
      });

    }
    $scope.signup = function () {
      $state.go('signup');
    }
  })



  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });