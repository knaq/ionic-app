angular.module('profile.controllers', ['profile.services', 'knaq.services'])
    .controller('ProfilePageCtrl', function ($scope, $state, $firebaseAuth, $ionicPopup, Auth, Data, SkillsFirebaseConnection) {

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

        $scope.allUsers = null;

        Data.getUser(Auth.getUser()).then(function (data) {
            $scope.signedInUser = data;
            // console.log('lol');
            // console.log($scope.signedInUser);

        });

        $scope.remove = function (skill) {
            Skills.remove(skill);
        };

        /*Todo: Connect  userId to firebase authentication data*/
        $scope.newSkill = function () {
            ProfileFirebaseConnection.add(this.title, this.pay, this.location, this.description, "954a5f56-7fdb-4039-a9a1-e5afa2a5e338");
            $ionicHistory.goBack();
        }
        // console.log($scope.signedInUser.$id);


        // Triggered on a button click, or some other target
        $scope.showPopup = function () {
            $scope.data = {};
            console.l
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.wifi">',
                title: 'Add new skill!',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
        };
    })
    .controller('SkillDetailCtrl', function ($scope, $location, $stateParams,  SkillsFirebaseConnection, Auth) {
        $scope.userId = Auth.getUser().$id;
        console.log($scope.userId);
        $scope.skillName = $stateParams.skill;
        $scope.endorsements = SkillsFirebaseConnection.get($scope.skillName);
        $scope.allEndorsements = SkillsFirebaseConnection.getAll();

        console.log($scope.endorsements);
        console.log($scope.allEndorsements);
    })
    .controller('PortfolioDetailCtrl', function ($scope, $stateParams, SkillsFirebaseConnection) {
        $scope.skill = Skills.get($stateParams.skillId);
    });