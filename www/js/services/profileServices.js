angular.module('knaq.profileServices',[])
    .service('SkillsFirebaseConnection', function ($firebaseArray) {
        // this.firebaseReference = new Firebase("https://knaqapp.firebaseio.com/users");
        this.firebaseReference = new Firebase("https://knaqapp.firebaseio.com/users/221fa728-0d3c-4ef2-a502-e37ccd21928a/skills");
        this.skills = $firebaseArray(this.firebaseReference);

        this.getAll = function () {
            return this.skills;
        };

        this.get = function (key) {
            return this.skills.$getRecord(key);
        };

        this.remove = function (record) {
            return this.skills.$remove(record);
        };

        this.get = function () {
            this.skills;
        };

        this.getSkill = function (key) {
            return this.skills.$getRecord(key);
        };

        this.addSkill = function (name) {
            this.skills.$add({
                name: name
            });
        };
    });