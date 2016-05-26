angular.module('knaq.dataServices', [])

    .factory('Data', function ($firebaseObject, $firebaseArray) {

        var ref = new Firebase("https://knaqapp.firebaseio.com/users");

        return {

            getAllUsers: function () {

                return $firebaseArray(ref).$loaded();

            },
            getUser: function (userid) {

                return $firebaseObject(ref.child(userid)).$loaded();

            },
            postReview: function (_reviewer, _userId, _gidId, _title, _text, _rating) {
                console.log(_userId)
                console.log(_gidId)
                console.log(_title)
                console.log(_text)
                console.log(_rating)

                var review = {
                    reviewer: _reviewer,
                    work: _gidId,
                    title: _title,
                    text: _text,
                    rating: _rating
                }
                return $firebaseArray(ref.child(_userId).child('reviews')).$add(review);
            }
        }
    });