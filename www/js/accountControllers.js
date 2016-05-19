angular.module('knaq.accountControllers', [])
.controller('AccountCtrl', function($scope, $state, Data, Auth) {
    $scope.account = {};
    $scope.account.signout = function() {

        Auth.logout();
        $state.go('signin');
    }
});