angular.module('knaq.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('MyAuth', function($firebaseAuth) {

  var ref = new Firebase('https://knaq.firebaseio.com');
  var fbAuth = $firebaseAuth(ref);
  var getAuth = fbAuth.$getAuth();

  var myAuth = {
    grabAuth: getAuth,
    authRef: fbAuth
  }

  return myAuth;

})

.factory('UserService', function($firebaseArray) {

  var refUsers = new Firebase('https://knaq.firebaseio.com/users');
  var fbRef = $firebaseArray(refUsers);
  var current = {};

  var userService = {
    addUser: function  (id, username) {
      fbRef.$add({
        loginID: id,
        user: username,
        online: 'false'
      });
    },
    setCurrentUser:function  (user) {
      current = user;
    },
    getCurrentUser:function  () {
      return current;
    },
    getUser:function  () {
      return fbRef;
    },
    userOnline: function  (id) {
      var theID = fbRef.$getRecord(id);
      theID.online = 'true',
      fbRef.$save(theID);
    },
    userOffline: function (id) {
      var theID = fbRef.$getRecord(id);
      theID.online = 'false',
      fbRef.$save(theID);
    },
    clearCurrent:function  (arguments) {
      current = '';
    }
  }

  return userService;

});