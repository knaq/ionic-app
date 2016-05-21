// Ionic knaq App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'knaq' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'knaq.services' is found in services.js
// 'knaq.controllers' is found in controllers.js
angular.module('knaq', [
  'firebase',
  'ionic',


  'knaq.dataServices',
  'knaq.authServices',
  'knaq.gigServices',
  'knaq.profileServices',
  'knaq.myGigsServices',

  'knaq.profileControllers',
  'knaq.authControllers',
  'knaq.myGigsControllers',
  'knaq.discoverGigsControllers',
  'knaq.accountControllers'

])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $urlMatcherFactoryProvider.strictMode(false)
  $stateProvider

  // setup an abstract state for the register page
    .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignUpCtrl'
  })


  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'SignInCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    onEnter: function($state, Auth) {
      if (!Auth.isLoggedIn()) {
        $state.go('signin');
      }
    }
  })

  // Each tab has its own nav history stack:

  .state('tab.profile', {
      url: '/profile',
      params: {
        userSignedInID: null
      },
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfilePageCtrl'
        }
      }
    })
    .state('tab.skill-detail', {
      url: '/profile/skill/:skill',
      views: {
        'tab-profile': {
          templateUrl: 'templates/skill-detail.html',
          controller: 'SkillDetailCtrl'
        }
      }
    })
    .state('tab.portfolio-detail', {
      url: '/profile/portfolio/:portfolioItemId',
      views: {
        'tab-profile': {
          templateUrl: 'templates/portfolio-detail.html',
          controller: 'PortfolioDetailCtrl'
        }
      }
    })


  .state('tab.my-gigs', {
      url: '/my-gigs',
      views: {
        'tab-my-gigs': {
          templateUrl: 'templates/tab-my-gigs.html',
          controller: 'MyGigsCtrl'
        }
      }
    })
    .state('tab.my-gig-detail', {
      url: '/my-gigs/my-gig-detail',
      params: {
        myParentState: null,
        myGigData: null
      },
      views: {
        'tab-my-gigs': {
          templateUrl: 'templates/tab-my-gig-detail.html',
          controller: 'MyGigDetailCtrl'
        }
      }
    })
    .state('tab.discover-gigs', {
      url: '/discover-gigs',
      views: {
        'tab-discover-gigs': {
          templateUrl: 'templates/tab-discover-gigs.html',
          controller: 'DiscoverGigsCtrl'
        }
      }
    })
    .state('tab.gig-detail', {
      url: '/discover-gigs/:gigId',
      views: {
        'tab-discover-gigs': {
          templateUrl: 'templates/tab-gig-detail.html',
          controller: 'GigDetailCtrl'
        }
      }
    })

  .state('tab.new-gig', {
    url: '/new-gig',
    views: {
      'tab-discover-gigs': {
        templateUrl: 'templates/tab-gig-new.html',
        controller: 'NewGigCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signin');

});