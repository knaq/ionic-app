angular.module('knaq.myGigsControllers', [])
	.controller('MyGigsCtrl', function($scope, $state, Data, Auth) {
		$scope.myGigs = {};
		$scope.myGigs.activeTab = 1;

		$scope.myGigs.tabClick = function(tab) {
			$scope.myGigs.activeTab = tab;
			console.log($scope.myGigs.activeTab)
		}
		$scope.myGigs.pageTitle = "My gigs go here"

	});