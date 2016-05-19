angular.module('knaq.myGigsControllers', [])
	.controller('MyGigsCtrl', function($scope, $state, Data, Auth, MyGigsServices) {
		$scope.myGigs = {};
		$scope.myGigs.activeTab = 1;

		$scope.myGigs.tabClick = function(selection) {

			$scope.myGigs.tabSelection = selection;
			console.log(selection)
		}
		$scope.myGigs.pageTitle = "My gigs go here"

	});