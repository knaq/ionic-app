angular.module('knaq.myGigsControllers', [])
	.controller('MyGigsCtrl', function($scope, $state, Data, Auth, MyGigsServices) {
		$scope.myGigs = {};
		$scope.myGigs.activeTab = 1;

		$scope.myGigs.tabClick = function(selection) {

			$scope.myGigs.tabSelection = selection;
			
			switch($scope.myGigs.tabSelection){
				case "tab-myposts":
					console.log("Now in myposts")
					console.log(MyGigsServices.getPosts())
					break;
				case "tab-applied":
					console.log("Now applied")
					break;
				default:
					console.log("Now inprogress")
			}
		}
		$scope.myGigs.pageTitle = "My gigs go here"

	});