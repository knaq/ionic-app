angular.module('knaq.profileServices',[])
    .service('ProfileFirebaseConnect', function($firebaseArray) {
        this.firebaseReference = new Firebase("https://knaqapp.firebaseio.com/users/");
    }) 
    
    .service('SkillsFirebaseConnection', function ($firebaseArray) {
        // this.firebaseReference = new Firebase("https://knaqapp.firebaseio.com/users");
        this.firebaseReference = new Firebase("https://knaqapp.firebaseio.com/users/");

        this.getAll = function (userId) {
            return $firebaseArray(this.firebaseReference.child(userId).child('skills'))
        };

        this.get = function (userId, key) {
            return $firebaseObject(this.firebaseReference.child(userId).child('skills').child(key))
        };

        this.remove = function (userId, record) {
            var skills = $firebaseArray(this.firebaseReference.child(userId).child('skills'))
            return skills.$remove(record);
        };

        this.add = function (userId, name) {
            var skills = $firebaseArray(this.firebaseReference.child(userId).child('skills'))
            skills.$add({
                name: name
            });
        };
    });