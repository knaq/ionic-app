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

	});