angular.module('base64.services', [])

    .factory('Base64', function () {
        return {
            getDataUrlFromUrl: function (url, callback) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        callback(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.send();
            }
        }
    })

