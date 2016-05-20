angular.module('knaq.myGigsControllers', [])
	.controller('MyGigsCtrl', function($scope, $state, Data, Auth, MyGigsServices) {
		$scope.myGigs = {};
		$scope.myGigs.activeTab = 1;

		$scope.myGigs.tabClick = function(selection) {

			$scope.myGigs.tabSelection = selection;
			
			switch($scope.myGigs.tabSelection){
				case "tab-myposts":
					MyGigsServices.getPosts().then(function (myPosts) {
						$scope.myGigs.myPosts = myPosts 
					}, function (error) {
						console.error(error)
					})
					break;
				case "tab-applied":
					MyGigsServices.getApplied().then(function (myAppliedGigs) {
						$scope.myGigs.myAppliedGigs = myAppliedGigs
					},function (error) {
						console.error(error)
					})
					break;
				default:
					MyGigsServices.getInProgress().then(function (gigsInProgress) {
						$scope.myGigs.gigsInProgress = gigsInProgress
					},function (error) {
						console.error(error)
					})
			}
		}
		$scope.myGigs.pageTitle = "My gigs go here"

	});