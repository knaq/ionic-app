angular.module('knaq.controllers', [])

.controller('ProfileCtrl', function($scope, $state, MyAuth, $firebaseAuth, UserService) {

  $scope.grabAuth = MyAuth.grabAuth;

  $scope.theUser = UserService.getCurrentUser();
  $scope.allUsers = UserService.getUser();

  var tmpID;

  if($scope.grabAuth){

    tmpID = $scope.theUser.fbID;

  }else{
    $state.go('signin');
  }

  $scope.logOut = function  () {

    UserService.clearCurrent();

    if(tempID) {
      UserService.userOffline(tmpID);
    }

    MyAuth.authRef.$unauth();
    $state.go('signin');

  }

})
.controller('SignUpCtrl', function  ($scope, $state, MyAuth, UserService) {

  $scope.signup={};

  $scope.reset = function  () {

    $scope.signup.email="";
    $scope.signup.password="";
    $scope.signup.passwordConfirmation="";

  }
  $scope.signUp = function() {

    MyAuth.authRef.$createUser({
      email: $scope.signup.email,
      password: $scope.signup.password
    }).then(function (userData) {
      console.log(userData)
      $scope.saveUser = UserService.addUser(userData.uid, $scope.signup.email);
    });

  }
})

.controller('SignInCtrl', function  ($scope, $state, MyAuth, UserService) {

  var tmpUser = {};

  $scope.signin={};

  $scope.reset = function  () {

    $scope.signin.email="";
    $scope.signin.password="";

  }

  $scope.signIn = function  () {

    MyAuth.authRef.$authWithPassword({
      email: $scope.signin.email,
      password: $scope.signin.password
    })
    .then(function (authData) {
      $scope.authdata = authData;
      if($scope.authdata){
        $scope.loggedIn = UserService.getUser();
        $scope.loggedIn. $loaded().then(function () {
          for (var i = 0; i < $scope.loggedIn.length; i++) {
            if($scope.loggedIn[i].loginID == $scope.authdata.uid){
              tmpUser = {
                fbID: $scope.loggedIn[i].$id,
                loginID: $scope.loggedIn[i].loginID,
                user: $scope.loggedIn[i].user
              }
              UserService.userOnline(tmpUser.fbID);
              UserService.setCurrentUser(tmpUser);

              $state.go('tab.profile');
            }
          }
        });
      }
      else{

        $state.go('tab.profile');

      }

    })
    .catch(function () {
      console.log('failed to authenticate: ', error);
    });

  }
  $scope.signup = function  () {
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
