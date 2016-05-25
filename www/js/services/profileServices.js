angular.module('knaq.profileServices',[])
    
    .service('SkillsFirebaseConnection', function ($firebaseArray, $firebaseObject) {
        // this.firebaseReference = new Firebase("https://knaqapp.firebaseio.com/users");
        this.firebaseReference = new Firebase("https://knaqapp.firebaseio.com/users/");

        this.getAll = function (userId) {
            return $firebaseArray(this.firebaseReference.child(userId).child('skills'))
        };

        this.get = function (userId, key) {
            return $firebaseObject(this.firebaseReference.child(userId).child('skills').child(key))
        };

        this.remove = function (userId, name) {
            var skill = $firebaseObject(this.firebaseReference.child(userId).child('skills').child(name))
            return skill.$remove()
        };

        this.add = function (userId, name) {
            var skills = $firebaseArray(this.firebaseReference.child(userId).child('skills'))
            skills.$add({
                name: name
            });
        };
    });