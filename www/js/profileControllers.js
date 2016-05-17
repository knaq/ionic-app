angular.module('profile.controllers', ['profile.services', 'knaq.services', 'firebase'])
    .controller('ProfilePageCtrl', function ($scope, $state, $firebaseAuth, $firebaseArray, $ionicPopup, Session, Data, SkillsFirebaseConnection) {
        $scope.selection = 'reviews';

        $scope.click = function (view) {
            $scope.selection = view;
        }

        // set the rate and max variables
        $scope.rating = {};
        $scope.rating.max = 5;
        $scope.readOnly = true;

        $scope.ratingsCallback = function (rating) {
            console.log('Selected rating is : ', rating);
        };

        $scope.allUsers = null;

        Data.getUser(Session.getUser()).then(function (data) {
            $scope.signedInUser = data;
            $scope.userSkillFirebaseReference = new Firebase("https://knaq.firebaseio.com/users" + "/" + $scope.signedInUser.$id + "/skills");
            $scope.skillsArray = $firebaseArray($scope.userSkillFirebaseReference);
        });

        $scope.remove = function (skill) {
            Skills.remove(skill);
        };

        $scope.newSkill = function (newSkillName) {
            // $scope.skillsArray.$add({
            //     name: newSkillName
            // });
            $scope.skillsArray.$ref().child(newSkillName).set({
                name: newSkillName
            });
        }
        // console.log($scope.signedInUser.$id);


        // Triggered on a button click, or some other target
        $scope.showPopup = function () {
            console.log($scope.userSkillFirebaseReference);

            $scope.data = {};
            console.l
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.newSkillName">',
                title: 'Add new skill!',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $scope.newSkill($scope.data.newSkillName);
                        }
                    }
                ]
            });

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
        };
    })
    .controller('SkillDetailCtrl', function ($scope, $location, $stateParams, SkillsFirebaseConnection, Session, Data) {
        Data.getUser(Session.getUser()).then(function (data) {
            $scope.skill = data.skills[$stateParams.skill];
            console.log($scope.skill);
        });

        // $scope.endorsements = SkillsFirebaseConnection.get($scope.skillName);
        // $scope.allEndorsements = SkillsFirebaseConnection.getAll();
    })
    .controller('PortfolioDetailCtrl', function ($scope, $stateParams, SkillsFirebaseConnection) {
        $scope.skill = Skills.get($stateParams.skillId);
    });