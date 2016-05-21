angular.module('knaq.myGigsControllers', [])
	.controller('MyGigsCtrl', function($scope, $state, Data, Auth, MyGigsServices) {
		$scope.myGigs = {};
		$scope.myGigs.tabSelection = 'tab-inprogress';
		$scope.myGigs.loadingData = true;

		var defaultTabLogic = function(arguments) {
			MyGigsServices.getInProgress().then(function(gigsInProgress) {
				$scope.myGigs.gigsInProgress = gigsInProgress
				$scope.myGigs.loadingData = false;
			}, function(error) {
				console.error(error)
				$scope.myGigs.loadingData = false;
			})
		}
		defaultTabLogic();

		$scope.myGigs.tabClick = function(selection) {
			console.log("tab change")

			$scope.myGigs.tabSelection = selection;

			switch ($scope.myGigs.tabSelection) {
				case "tab-myposts":
					MyGigsServices.getPosts().then(function(myPosts) {
						$scope.myGigs.loadingData = false;
						$scope.myGigs.myPosts = myPosts
					}, function(error) {
						$scope.myGigs.loadingData = false;
						console.error(error)
					})
					break;
				case "tab-applied":
					MyGigsServices.getApplied().then(function(myAppliedGigs) {
						$scope.myGigs.loadingData = false;
						$scope.myGigs.myAppliedGigs = myAppliedGigs
					}, function(error) {
						$scope.myGigs.loadingData = false;
						console.error(error)
					})
					break;
				default:
					defaultTabLogic();
			}
		}
		$scope.myGigs.viewDetail = function (parentState, gigData) {
			$state.go('tab.my-gig-detail', {myParentState:parentState, myGigData:gigData});
		}

	})
	.controller('MyGigDetailCtrl', function($scope, GigFirebaseConnection, $state, Auth) {
		
		$scope.myGigDetail = {};
		var userId = Auth.getUser();
		$scope.myGigDetail.myParentState = $state.params.myParentState
		$scope.myGigDetail.myGigData = $state.params.myGigData;

		console.log($scope.myGigDetail.myParentState)
		console.log($scope.myGigDetail.myGigData)
	

	})