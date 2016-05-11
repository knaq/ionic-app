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
  .factory('Session', function() {
    if (window.localStorage['session']) {
      var _user = window.localStorage['session'];
    }
    var setUser = function(session) {
      _user = session;
      window.localStorage['session'] = _user;
    }

    return {
      setUser: setUser,
      isLoggedIn: function() {
        return _user ? true : false;
      },
      getUser: function() {
        return _user;
      },
      logout: function() {
        window.localStorage.removeItem("session");
        window.localStorage.removeItem("list_dependents");
        _user = null;
      }
    }
  })
  .factory('Data', function($firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://knaq.firebaseio.com/users");
    
    return {

      getAllUsers: function() {

        return $firebaseArray(ref).$loaded();

      },
      getUser: function(userid) {

        return $firebaseObject(ref.child(userid)).$loaded();

      },
      setUserOnline: function(userid) {

        var onlineStatus = $firebaseObject(ref.child(userid).child('online'))

        onlineStatus.$loaded().then(function() {
          console.log(onlineStatus.$value); 
        });

        onlineStatus.$value = "true"

        return onlineStatus.$save();

      },
      setUserOffline: function(userid) {

        var onlineStatus = $firebaseObject(ref.child(userid).child('online'))

        onlineStatus.$loaded().then(function() {
          console.log(onlineStatus.$value); 
        });

        onlineStatus.$value = "false"

        return onlineStatus.$save();

      }


    }

  });