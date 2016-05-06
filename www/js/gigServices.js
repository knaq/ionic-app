angular.module('gig.services', [])

.factory('Gigs', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var gigs = [{
    id: 0,
    company: 'Ben Sparrow',
    description: 'You on your way?',
    photo: 'img/ben.png'
  }, {
    id: 1,
    company: 'Max Lynx',
    description: 'Hey, it\'s me',
    photo: 'img/max.png'
  }, {
    id: 2,
    company: 'Adam Bradleyson',
    description: 'I should buy a boat',
    photo: 'img/adam.jpg'
  }, {
    id: 3,
    company: 'Perry Governor',
    description: 'Look at my mukluks!',
    photo: 'img/perry.png'
  }, {
    id: 4,
    company: 'Mike Harrington',
    description: 'This is wicked good ice cream.',
    photo: 'img/mike.png'
  }];

  return {
    all: function() {
      return gigs;
    },
    remove: function(gig) {
      gigs.splice(gigs.indexOf(gig), 1);
    },
    get: function(gigId) {
      for (var i = 0; i < gigs.length; i++) {
        if (gigs[i].id === parseInt(gigId)) {
          return gigs[i];
        }
      }
      return null;
    }
  };
});