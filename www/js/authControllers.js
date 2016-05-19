angular.module('knaq.controllers', [])

.controller('SignUpCtrl', function($scope, $firebaseObject, $state) {

    $scope.signup = {};
    $scope.reset = function() {

        $scope.signup.email = "";
        $scope.signup.password = "";
        $scope.signup.passwordConfirmation = "";
        $scope.signup.username = "";

    };
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
                    online: 'false'
                });

                $state.go('signin');


            }
        });

    };
})

.controller('SignInCtrl', function($scope, $state, Auth, Data) {

    var tmpUser = {};

    $scope.signin = {};

    $scope.reset = function() {

        $scope.signin.email = "";
        $scope.signin.password = "";

    };
    $scope.signIn = function() {

        var ref = new Firebase("https://knaq.firebaseio.com");


        ref.authWithPassword({
            email: $scope.signin.email,
            password: $scope.signin.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);

                //Passing authenticated users id to Auth Service
                Auth.setUser(authData.uid);

                $state.go('tab.profile');

                $scope.signin.email = "";
                $scope.signin.password = "";

            }
        });

    };
    $scope.signup = function() {

        $state.go('signup');

    };


})


