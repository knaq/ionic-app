angular.module('imgur.services', [])
    .factory('ImgurService', function ($http) {

        var clientId = 'INSERT CLIENT ID';

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
