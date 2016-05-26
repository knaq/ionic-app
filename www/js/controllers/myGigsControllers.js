angular.module('knaq.myGigsControllers', [])
	.controller('MyGigsCtrl', function ($scope, $state, Data, Auth, MyGigsServices, GigFirebaseConnection) {
		$scope.myGigs = {};
		$scope.myGigs.tabSelection = 'tab-inprogress';
		$scope.myGigs.loadingData = true;

		var defaultTabAction = function (arguments) {
			MyGigsServices.getInProgress().then(function (gigsInProgress) {

				$scope.myGigs.gigsInProgress = gigsInProgress
				$scope.myGigs.loadingData = false;
			}, function (error) {
				console.error(error)
				$scope.myGigs.loadingData = false;
			})
		}
		var myPostsTabAction = function (arguments) {
			MyGigsServices.getPosts().then(function (myPosts) {
				$scope.myGigs.loadingData = false;
				$scope.myGigs.myPosts = myPosts
			}, function (error) {
				$scope.myGigs.loadingData = false;
				console.error(error)
			})
		}
		var appliedTabAction = function (arguments) {
			MyGigsServices.getApplied().then(function (myAppliedGigs) {
				$scope.myGigs.loadingData = false;
				$scope.myGigs.myAppliedGigs = myAppliedGigs
			}, function (error) {
				$scope.myGigs.loadingData = false;
				console.error(error)
			})
		}
		defaultTabAction();

		$scope.myGigs.tabClick = function (selection) {
			console.log("tab change")

			$scope.myGigs.tabSelection = selection;

			switch ($scope.myGigs.tabSelection) {
				case "tab-myposts":
					myPostsTabAction()
					GigFirebaseConnection.getAll().then(function (result) {
						result.$watch(myPostsTabAction)
					});
					break;
				case "tab-applied":
					appliedTabAction()
					GigFirebaseConnection.getAll().then(function (result) {
						result.$watch(appliedTabAction)
					})
					break;
				default:
					defaultTabAction();
					GigFirebaseConnection.getAll().then(function (result) {
						result.$watch(defaultTabAction)
					})
			}
		}
		$scope.myGigs.viewDetail = function (parentState, gigData) {
			$state.go('tab.my-gig-detail', {
				myParentState: parentState,
				myGigData: gigData
			});
		}

	})
	.controller('MyGigDetailCtrl', function ($scope, $q, $ionicActionSheet, GigFirebaseConnection, $state, Auth, Data) {

		$scope.myGigDetail = {};
		$scope.myGigDetail.loadingData = true;
		var applicants = []
		var userId = Auth.getUser();
		var gigID = $state.params.myGigData.$id;
		$scope.myGigDetail.myParentState = $state.params.myParentState
		$scope.myGigDetail.myGigData = $state.params.myGigData;
		$scope.myGigDetail.candidateAccepted = false;

		console.log($scope.myGigDetail.myGigData)


		var acceptedCandidateExist = function (acceptedCandidateId) {

			console.log(acceptedCandidateId)

			$scope.myGigDetail.candidateAccepted = true;

			Data.getUser(acceptedCandidateId).then(function (hire) {

				$scope.myGigDetail.hire = hire
				console.log($scope.myGigDetail.hire)

			}, function (error) {
				console.log(error)
			});

		}

		GigFirebaseConnection.get(gigID).then(function (gig) {
			if (gig.acceptedCandidate != null) {

				acceptedCandidateExist(gig.acceptedCandidate);

			}
			gig.$watch(function () {
				if (gig.acceptedCandidate != null) {
					acceptedCandidateExist(gig.acceptedCandidate);
				}
			})
		});


		angular.forEach($scope.myGigDetail.myGigData.applicants, function (value, userId) {

			applicants.push(Data.getUser(userId))

		})

		$q.all(applicants).then(function (allApplicants) {
			console.log("received all applicants")
			console.log(allApplicants)
			$scope.myGigDetail.allApplicants = allApplicants;
			$scope.myGigDetail.loadingData = false;
		}, function (error) {
			console.error(error)
		})


		//Button Activities
		$scope.myGigDetail.notifyCompletion = function () {
			console.log("Trying to notify employer about the completion of the gig");
			$ionicBackdrop.release()

		}
		$scope.myGigDetail.drop = function () {
			console.log("Trying to drop gig in progress")
			GigFirebaseConnection.removeAcceptedApplicant(gigID).then(function () {
				console.log("successful drop of gig")

				$state.go('tab.my-gigs')
			}, function (error) {
				console.error(error)
			})
		}
		$scope.myGigDetail.unapply = function () {
			console.log("Trying to unapply")
			GigFirebaseConnection.removeApplicant(gigID, userId);
			$state.go('tab.my-gigs')
		}
		$scope.myGigDetail.delete = function () {
			console.log("Trying to delete a post")
			GigFirebaseConnection.delete(gigID).then(function () {
				console.log("successful deletion of gig")
				$state.go('tab.my-gigs')
			}, function (error) {
				console.error(error)
			})
		}
		$scope.myGigDetail.completed = function () {
			console.log("Trying to complete a project")

			GigFirebaseConnection.get(gigID).then(function (gig) {

				console.log(gig)
				gig.completed = "true"
				gig.$save().then(function () {
					var hideSheet = $ionicActionSheet.show({
						buttons: [{
							text: 'Okay'
						}],

						titleText: 'Give the worker your review',
						cancelText: 'Cancel',
						cancel: function () {
							$state.go('tab.my-gigs')
							// add cancel code..
						},
						buttonClicked: function (index) {
							if (index == 0) {

								$state.go('tab.work-review', {
									applicantId: $scope.myGigDetail.myGigData.acceptedCandidate,
									gigId: $scope.myGigDetail.myGigData.$id
								})

							}
							return true;
						}
					});
				})


			}, function (error) {
				console.error(error)
			});


		}
		$scope.myGigDetail.removeAcceptedApplicant = function () {
			GigFirebaseConnection.removeAcceptedApplicant(gigID).then(function () {
				console.log("successfully removed accepted candidate")
				$scope.myGigDetail.delete()
				$state.go('tab.my-gigs')
			}, function (error) {
				console.error(error)
			})
		}
		$scope.myGigDetail.reviewApplicant = function (applicant) {

			$state.go('tab.review-applicant', {
				applicantType: "Applicant",
				applicantId: applicant,
				gigId: $scope.myGigDetail.myGigData.$id
			});
			//$state.go('tab.review-applicant');
		}
		$scope.myGigDetail.reviewHire = function () {

			//trying to review hire
			$state.go('tab.review-applicant', {
				applicantType: "Worker",
				applicantId: $scope.myGigDetail.myGigData.acceptedCandidate,
				gigId: $scope.myGigDetail.myGigData.$id
			});
			//$state.go('tab.review-applicant');
		}



	})
	.controller('ReviewApplicant', function ($ionicHistory, $scope, GigFirebaseConnection, $state, Auth, Data) {


		$scope.reviewApplicant = {};
		$scope.reviewApplicant.selection = 'reviews';

		$scope.reviewApplicant.click = function (view) {
			$scope.reviewApplicant.selection = view;
		}
		$scope.reviewApplicant.loadingData = true;
		$scope.reviewApplicant.applicantType = $state.params.applicantType
		$scope.reviewApplicant.applicantId = $state.params.applicantId
		$scope.reviewApplicant.gigId = $state.params.gigId
		$scope.reviewApplicant.hired = false;

		Data.getUser($scope.reviewApplicant.applicantId).then(function (applicant) {

			$scope.reviewApplicant.applicantData = applicant
			console.log($scope.reviewApplicant.applicantData)
			$scope.reviewApplicant.loadingData = false


		}, function (error) {
			console.log(error)
		});

		$scope.reviewApplicant.hire = function () {
			console.log("Hiring")
			console.log($scope.reviewApplicant.gigId)
			console.log($scope.reviewApplicant.applicantId)
			GigFirebaseConnection.hireFromApplicants($scope.reviewApplicant.gigId, $scope.reviewApplicant.applicantId).then(function () {
				console.log("successful hiring")
				GigFirebaseConnection.removeAllApplicants($scope.reviewApplicant.gigId).then(function () {
					console.log("removed all applied candidates")
					$ionicHistory.goBack();
				});
			}, function (error) {
				console.error(error)
			})
		}
		$scope.reviewApplicant.fire = function () {
			console.log("Firing")
			console.log($scope.reviewApplicant.gigId)
			console.log($scope.reviewApplicant.applicantId)
			GigFirebaseConnection.removeAcceptedApplicant($scope.reviewApplicant.gigId).then(function () {
				console.log("successfully removed accepted candidate")
				GigFirebaseConnection.delete($scope.reviewApplicant.gigId).then(function () {
					console.log("successful deletion of gig")
					$state.go('tab.my-gigs')
				}, function (error) {
					console.error(error)
				})
			}, function (error) {
				console.error(error)
			})
		}



	})
	.controller('WorkReview', function ($ionicHistory, $scope, GigFirebaseConnection, $state, Auth, Data) {
		$scope.workReview = {};

		$scope.workReview.applicantId = $state.params.applicantId
		$scope.workReview.gigId = $state.params.gigId

		$scope.workReview.worker = null

		Data.getUser($scope.workReview.applicantId).then(function (workerData) {
			console.log(workerData)
			$scope.workReview.worker = workerData
		})


		$scope.workReview.rating = 1
		$scope.workReview.readOnly = false

		console.log($scope.workReview.applicantId)
		console.log($scope.workReview.gigId)


		$scope.workReview.onRating = function () {
			console.log($scope.workReview.rating)
		}
		$scope.workReview.submitReview = function () {
			Data.postReview(Auth.getUser(), $scope.workReview.applicantId, $scope.workReview.gigId, $scope.workReview.title, $scope.workReview.text, $scope.workReview.rating).then(
				function (successData) {
					console.log(successData)
					$state.go('tab.my-gigs')
				}, function (error) {
					console.error("error")
					$state.go('tab.my-gigs')
				})
		}

	})