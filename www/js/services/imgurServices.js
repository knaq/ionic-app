angular.module('knaq.imgurServices', [])
    .factory('Imgur', function ($http) {

        var clientId = 'INSERT_CLIENT_ID_HERE';

        return {
            uploadPhoto: function (imageData) {

                var imgurData = imageData.replace("data:image/jpeg;base64,", "")

                return $http({
                    headers: {
                        'Authorization': 'Client-ID ' + clientId
                    },
                    url: 'https://api.imgur.com/3/upload',
                    method: 'POST',
                    data: {
                        'image': imgurData,
                        'type': 'base64'
                    }
                });
            }
        }
    });