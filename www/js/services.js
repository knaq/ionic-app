angular.module('knaq.services', [])

.factory('Auth', function($firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://knaq.firebaseio.com/users");

    if (window.localStorage.session) {
        var _user = window.localStorage.session;
    }

    return {
        setUser: function(session) {
            _user = session;
            window.localStorage.session = _user;
            this.setUserOnline();
        },

        isLoggedIn: function() {
            return _user ? true : false;
        },
        getUser: function() {
            return _user;
        },
        logout: function() {
            this.setUserOffline();
            window.localStorage.removeItem("session");
            window.localStorage.removeItem("list_dependents");

            _user = null;
        },
        setUserOnline: function() {

            var onlineStatus = $firebaseObject(ref.child(_user).child('online'))

            onlineStatus.$loaded().then(function() {
                console.log(onlineStatus.$value);
            });

            onlineStatus.$value = "true"

            return onlineStatus.$save();

        },
        setUserOffline: function() {

            var onlineStatus = $firebaseObject(ref.child(_user).child('online'))

            onlineStatus.$loaded().then(function() {
                console.log(onlineStatus.$value);
            });

            onlineStatus.$value = "false"

            return onlineStatus.$save();

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

        }

    }

});