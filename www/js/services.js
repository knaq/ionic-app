angular.module('knaq.services', [])

.factory('Session', function() {
    if (window.localStorage.session) {
        var _user = window.localStorage.session;
    }
    var setUser = function(session) {
        _user = session;
        window.localStorage.session = _user;
    };

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
    };
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
