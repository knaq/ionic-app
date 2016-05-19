angular.module('knaq.accountControllers', [])
.controller('AccountCtrl', function($scope, $state, Data, Session) {
    $scope.account = {};
    $scope.account.signout = function() {
        console.log("signing out");
        Data.setUserOffline(Session.getUser()).then(function(data) {
            console.log("User is offline now!");
        });
        Session.logout();
        $state.go('signin');
    }
});