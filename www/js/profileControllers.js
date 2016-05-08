angular.module('profile.controllers', [])
    .controller('ProfilePageCtrl', function ($scope, $state, MyAuth, $firebaseAuth, Skills, Reviews, Portfolio) {

        $scope.selection = 'reviews';

        $scope.click = function (view) {
            $scope.selection = view;
        }

        // set the rate and max variables
        $scope.rating = {};
        $scope.rating.rate = 3;
        $scope.rating.max = 5;
        $scope.readOnly = true;

        $scope.ratingsCallback = function (rating) {
            console.log('Selected rating is : ', rating);
        };

        $scope.skills = Skills.all();
        console.log($scope.skills);
        // console.log($scope.signedInUser.skills)
        $scope.reviews = Reviews.all();
        $scope.portfolio = Portfolio.all();
        $scope.remove = function (skill) {
            Skills.remove(skill);
        };
    })
    .controller('SkillDetailCtrl', function ($scope, $stateParams, Skills) {
        $scope.skill = Skills.get($stateParams.skillId);
    })
    .controller('PortfolioDetailCtrl', function ($scope, $stateParams, Portfolio) {
        $scope.skill = Skills.get($stateParams.skillId);
    });