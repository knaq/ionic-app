angular.module('knaq.profileControllers', [])

    .controller('ProfilePageCtrl', function ($scope, $state, $firebaseAuth, $firebaseArray, $ionicPopup, Auth, Data, SkillsFirebaseConnection) {
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
        $scope.profileEditInfo = {};

        Data.getUser(Auth.getUser()).then(function (data) {
            $scope.signedInUser = data;

            $scope.profileEditInfo.firstName = $scope.signedInUser.firstname;
            $scope.profileEditInfo.lastName = $scope.signedInUser.lastname;
            $scope.profileEditInfo.email = $scope.signedInUser.email;
            
            $scope.skillsArray = SkillsFirebaseConnection.getAll(data.$id)
        });

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

        $scope.profileEditInfo.apply = function () {
            console.log($scope.profileEditInfo.firstName)
            console.log($scope.profileEditInfo.lastName)
            console.log($scope.profileEditInfo.email)
            $scope.signedInUser.firstname = $scope.profileEditInfo.firstName;
            $scope.signedInUser.lastname = $scope.profileEditInfo.lastName;
            $scope.signedInUser.email = $scope.profileEditInfo.email;
            $scope.signedInUser.$save();
            $state.go('tab.profile');
        }

        $scope.editProfile = function () {
            $state.go('tab.profile-edit');
        }

    })
    .controller('SkillDetailCtrl', function ($scope, $location, $stateParams, SkillsFirebaseConnection, Auth, Data) {
        Data.getUser(Auth.getUser()).then(function (data) {
            $scope.skill = data.skills[$stateParams.skill];
            console.log($scope.skill);
        });

        // $scope.endorsements = SkillsFirebaseConnection.get($scope.skillName);
        // $scope.allEndorsements = SkillsFirebaseConnection.getAll();
    })
    .controller('PortfolioDetailCtrl', function (Auth, $scope, $stateParams, SkillsFirebaseConnection) {
        $scope.skill = SkillsFirebaseConnection.get(Auth.getUser(), $stateParams.skillId);
    });