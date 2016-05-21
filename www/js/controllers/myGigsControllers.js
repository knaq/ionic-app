angular.module('knaq.myGigsControllers', [])
	.controller('MyGigsCtrl', function($scope, $state, Data, Auth, MyGigsServices, GigFirebaseConnection) {
		$scope.myGigs = {};
		$scope.myGigs.tabSelection = 'tab-inprogress';
		$scope.myGigs.loadingData = true;

		var defaultTabAction = function(arguments) {
			MyGigsServices.getInProgress().then(function(gigsInProgress) {
				$scope.myGigs.gigsInProgress = gigsInProgress
				$scope.myGigs.loadingData = false;
			}, function(error) {
				console.error(error)
				$scope.myGigs.loadingData = false;
			})
		}
		var myPostsTabAction = function(arguments) {
			MyGigsServices.getPosts().then(function(myPosts) {
				$scope.myGigs.loadingData = false;
				$scope.myGigs.myPosts = myPosts
			}, function(error) {
				$scope.myGigs.loadingData = false;
				console.error(error)
			})
		}
		var appliedTabAction = function(arguments) {
			MyGigsServices.getApplied().then(function(myAppliedGigs) {
				$scope.myGigs.loadingData = false;
				$scope.myGigs.myAppliedGigs = myAppliedGigs
			}, function(error) {
				$scope.myGigs.loadingData = false;
				console.error(error)
			})
		}
		defaultTabAction();

		$scope.myGigs.tabClick = function(selection) {
			console.log("tab change")

			$scope.myGigs.tabSelection = selection;

			switch ($scope.myGigs.tabSelection) {
				case "tab-myposts":
					myPostsTabAction()
					GigFirebaseConnection.getAll().then(function(result) {
						result.$watch(myPostsTabAction)
					});
					break;
				case "tab-applied":
					appliedTabAction()
					GigFirebaseConnection.getAll().then(function(result) {
						result.$watch(appliedTabAction)
					})
					break;
				default:
					defaultTabAction();
					GigFirebaseConnection.getAll().then(function(result) {
						result.$watch(defaultTabAction)
					})
			}
		}
		$scope.myGigs.viewDetail = function(parentState, gigData) {
			$state.go('tab.my-gig-detail', {
				myParentState: parentState,
				myGigData: gigData
			});
		}

	})
	.controller('MyGigDetailCtrl', function($scope, GigFirebaseConnection, $state, Auth, Data) {

		$scope.myGigDetail = {};
		$scope.myGigDetail.applicants = []
		var userId = Auth.getUser();
		var gigID = $state.params.myGigData.$id;
		$scope.myGigDetail.myParentState = $state.params.myParentState
		$scope.myGigDetail.myGigData = $state.params.myGigData;

		angular.forEach($scope.myGigDetail.myGigData.applicants, function(value, userId) {
			Data.getUser(userId).then(function (userData) {
				$scope.myGigDetail.applicants.push(userData)
				console.log($scope.myGigDetail.applicants)
			},
			function () {
				console.log(error)
			});
		});
		


		console.log($scope.myGigDetail.applicants)

		$scope.myGigDetail.drop = function() {
			console.log("Trying to drop gig in progress")
			GigFirebaseConnection.removeAcceptedApplicant(gigID).then(function() {
				console.log("successful drop of gig")
				$state.go('tab.my-gigs')
			}, function(error) {
				console.error(error)
			})
		}
		$scope.myGigDetail.unapply = function() {
			console.log("Trying to unapply")
			GigFirebaseConnection.removeApplicant(gigID, userId);
			$state.go('tab.my-gigs')
		}
		$scope.myGigDetail.delete = function() {
			console.log("Trying to delete a post")
			GigFirebaseConnection.delete(gigID).then(function() {
				console.log("successful deletion of gig")
				$state.go('tab.my-gigs')
			}, function(error) {
				console.error(error)
			})
		}


	})