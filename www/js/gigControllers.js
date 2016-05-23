angular.module('gig.controllers', ['gig.services', 'knaq.services', 'knaq.controllers', 'base64.services', 'imageGallery.services'])

  .controller('GigsCtrl', function ($scope, GigFirebaseConnection, $state, $stateParams, Data) {

    $scope.gigs = {}

    GigFirebaseConnection.getAll().then(function (result) {


      var addUsername = function () {
        $scope.gigs.allGigList = $scope.gigs.retrievedGigList.map(function (gig) {

          Data.getUser(gig.userId).then(function (userData) {
            gig['username'] = userData.username;
          })

          return gig;

        })
      }

      $scope.gigs.retrievedGigList = result;
      addUsername()

      result.$watch(function () {
        addUsername();
      })



    })

  })


  .controller('GigDetailCtrl', function ($scope, GigFirebaseConnection, $stateParams, Session) {

    $scope.gigDetail = {}

    var gigLoadPromise = GigFirebaseConnection.get($stateParams.gigId);

    gigLoadPromise.then(function (result) {
      $scope.gigDetail.gig = result;
      console.log("Gig detail:")
      console.log($scope.gigDetail.gig);
    })

    $scope.gigDetail.applyBtnStates = [{
      label: "No function available",
      action: "doNothing()",
      style: "button button-block button-light"
    }, {
        label: "Apply",
        action: "apply()",
        style: "button button-block button-positive"
      }, {
        label: "Unapply",
        action: "unapply()",
        style: "button button-block button-assertive"
      }];


    $scope.gigDetail.checkApplyState = function () {
      if ($scope.gigDetail.gig == undefined || $scope.gigDetail.gig.applicants == undefined) {
        $scope.gigDetail.applyState = 0;
      } else if ($scope.gigDetail.gig.applicants.indexOf(Session.getUser()) == -1) {
        $scope.gigDetail.applyState = 1;
      } else {
        $scope.gigDetail.applyState = 2;
      }
    }

    $scope.gigDetail.apply = function () {
      var userId = Session.getUser();

      if ($scope.gigDetail.gig.applicants == undefined || $scope.gigDetail.gig.applicants == null) {
        $scope.gigDetail.gig.applicants = [userId];
        $scope.gigDetail.gig.$save();
      } else {
        $scope.gigDetail.gig.applicants.push(userId);
        $scope.gigDetail.gig.$save();
      }
    }

    $scope.gigDetail.unapply = function () {
      var userId = Session.getUser();
      var index = $scope.gigDetail.gig.applicants.indexOf(userId);
      while (index != -1) {
        $scope.gigDetail.gig.applicants.splice(index, 1);
        index = $scope.gigDetail.gig.applicants.indexOf(userId);
      }
      $scope.gigDetail.gig.$save();
    }


  })

  .controller('NewGigCtrl', function ($scope, $state, $ionicHistory, GigFirebaseConnection, Session, Base64, ImageGallery) {

    /*Todo: Connect  userId to firebase authentication data*/
    $scope.newGig = {}
    $scope.imageURI = null;

    $scope.getPicture = function () {
      ImageGallery.getPicture().then(function (results) {
        $scope.imageURI = results[0];
      });
    }


    $scope.newGig.postGig = function (imageUrl) {
      alert("imageurl: " + imageUrl);
      var imageData = Base64.getDataUrlFromUrl(imageUrl, function () {
        //GigFirebaseConnection.add($scope.newGig.title, $scope.newGig.pay, $scope.newGig.location, $scope.newGig.description, imageURI, Session.getUser());
      }.bind($scope));
      $scope.newGig.title = ""
      $scope.newGig.pay = ""
      $scope.newGig.location = ""
      $scope.newGig.description = ""
      $scope.newGig.imageURI = ""
      $state.go('tab.gigs');
    }
  });