angular.module('knaq.controllers', [])

.controller('ProfileCtrl', function($scope, $state, $firebaseAuth, Auth, Data) {

    
    $scope.allUsers = null;
    $scope.signedInUser = null;
    
    Data.getAllUsers().then(function (data) {
      $scope.allUsers = data
    })

    Data.getUser(Auth.getUser()).then(function (data) {
      $scope.signedInUser = data
    });

    $scope.signout = function  (arguments) {
      Auth.logout();
      $state.go('signin');
    }


  })
  .controller('SignUpCtrl', function($scope, $firebaseObject, $state) {

    $scope.signup = {};

    $scope.reset = function() {

      $scope.signup.email = "";
      $scope.signup.password = "";
      $scope.signup.passwordConfirmation = "";
      $scope.signup.username = "";

    }
    $scope.signUp = function() {

      var ref = new Firebase("https://knaq.firebaseio.com");
      var refToUsers = ref.child('users');

      ref.createUser({
        email: $scope.signup.email,
        password: $scope.signup.password
      }, function(error, userData) {
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

.controller('SignInCtrl', function($scope, $state, Auth) {

  var tmpUser = {};

  $scope.signin = {};

  $scope.reset = function() {

    $scope.signin.email = "";
    $scope.signin.password = "";

  }
  $scope.signIn = function() {

    var ref = new Firebase("https://knaq.firebaseio.com");

    ref.authWithPassword({
      email: $scope.signin.email,
      password: $scope.signin.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);

        Auth.setUser(authData.uid);
        $state.go('tab.profile');
        
        $scope.signin.email = "";
        $scope.signin.password = "";

      }
    });

  }
  $scope.signup = function() {
    $state.go('signup');
  }


})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});